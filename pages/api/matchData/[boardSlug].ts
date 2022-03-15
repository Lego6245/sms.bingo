import got, { ToughCookieJar } from 'got';
import { CookieJar } from 'tough-cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatEvent, FeedEvent, GoalEvent } from '../../../types/FeedEvent';
import getBase, { getBaseName } from '../../../data/airtable/getBase';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { boardSlug } = req.query;
    const base = getBase();
    let matchData;
    try {
        matchData = await base(getBaseName('match data'))
            .select({
                filterByFormula: '{bingosync_slug} = "' + boardSlug + '"',
                maxRecords: 1,
                fields: [
                    'goal_feed_data',
                    'raw_feed_data',
                    'raw_board_data',
                    'raw_settings_data',
                    'bingosync_password',
                    'detected_start_timestamp',
                    'match_format',
                ],
            })
            .all();
    } catch (e) {
        console.log(e);
        if (!!req.query.bingosyncPassword) {
            matchData = [
                {
                    bingosync_password: req.query.bingosyncPassword,
                },
            ];
        } else {
            res.status(500);
            res.send('No Board Found. Provide a bingosyncPassword as a query parameter.');
            return;
        }
    }
    if (!!matchData && matchData.length > 0) {
        const {
            goal_feed_data,
            raw_board_data,
            raw_settings_data,
            bingosync_password,
            detected_start_timestamp,
            raw_feed_data,
            match_format,
        } = matchData[0].fields;
        const airtable_matchdata_id = matchData[0].id;
        const format = match_format[0];
        if (!detected_start_timestamp && !!raw_feed_data) {
            const events = JSON.parse(raw_feed_data).events;
            const potential_start = getPotentialStart(events, format == 'Draft');
            await base(getBaseName('match data')).update(airtable_matchdata_id, {
                detected_start_timestamp: potential_start,
            });
            res.json({
                boardSlug: boardSlug,
                goal_feed_data: JSON.parse(goal_feed_data),
                raw_board_data: JSON.parse(raw_board_data),
                raw_settings_data: JSON.parse(raw_settings_data),
                detected_start_timestamp: potential_start,
            });
            return;
        }
        if (!!raw_board_data) {
            res.json({
                boardSlug: boardSlug,
                goal_feed_data: JSON.parse(goal_feed_data),
                raw_board_data: JSON.parse(raw_board_data),
                raw_settings_data: JSON.parse(raw_settings_data),
                detected_start_timestamp,
            });
            return;
        } else if (!!bingosync_password) {
            const cookieJar = new CookieJar();
            const custom = got.extend({
                responseType: 'json',
                cookieJar: cookieJar as ToughCookieJar, // Cast is safe here as got only interacts with two functions.
            });
            try {
                const data = {
                    room: boardSlug,
                    nickname: 'match_history_bot',
                    password: bingosync_password[0],
                };

                await custom.post('https://bingosync.com/api/join-room', {
                    json: data,
                    followRedirect: false,
                });
            } catch (e) {
                res.status(500);
                res.send('Error joining room');
                return;
            }

            if (cookieJar.getCookiesSync('https://bingosync.com/').length > 0) {
                const feedResponse = custom(
                    `https://bingosync.com/room/${boardSlug}/feed?full=true`
                );
                const boardResponse = custom(`https://bingosync.com/room/${boardSlug}/board`);
                const settingsResponse = custom(
                    `https://bingosync.com/room/${boardSlug}/room-settings`
                );

                try {
                    const [feedData, boardData, settingsData] = await Promise.all([
                        feedResponse,
                        boardResponse,
                        settingsResponse,
                    ]);
                    const clicksList: GoalEvent[] = (feedData.body as any).events.filter(
                        event => event.type == 'goal'
                    );

                    const startStamp = getPotentialStart(
                        (feedData.body as any).events,
                        format == 'Draft'
                    );

                    if (airtable_matchdata_id) {
                        await base(getBaseName('match data')).update(airtable_matchdata_id, {
                            raw_feed_data: JSON.stringify(feedData.body),
                            raw_board_data: JSON.stringify(boardData.body),
                            raw_settings_data: JSON.stringify(settingsData.body),
                            goal_feed_data: JSON.stringify(clicksList),
                            detected_start_timestamp: startStamp,
                        });
                    } else {
                        await base(getBaseName('match data')).create({
                            bingosync_slug: boardSlug,
                            raw_feed_data: JSON.stringify(feedData.body),
                            raw_board_data: JSON.stringify(boardData.body),
                            raw_settings_data: JSON.stringify(settingsData.body),
                            goal_feed_data: JSON.stringify(clicksList),
                            detected_start_timestamp: startStamp,
                        });
                    }

                    res.json({
                        boardSlug: boardSlug,
                        goal_feed_data: clicksList,
                        raw_board_data: boardData.body,
                        raw_settings_data: settingsData.body,
                        detected_start_timestamp: startStamp,
                    });
                    return;
                } catch (e) {
                    res.status(500);
                    res.send('Error scraping data: One of the room APIs failed.');
                    return;
                }
            } else {
                res.status(500);
                res.send('Error joining room: Response OK but no cookie set.');
                return;
            }
        } else {
            res.status(500);
            res.send('Error fetching match data: No Bingosync password available');
            return;
        }
    } else {
        res.status(500);
        res.send('Error fetching match data: No record of match');
        return;
    }
}
export default handler;

function getPotentialStart(rawFeed: FeedEvent[], useSecond: boolean): number {
    const potentialStarts: ChatEvent[] = (rawFeed as ChatEvent[]).filter(
        event =>
            event.type == 'chat' &&
            event.text.toLowerCase().trim().indexOf('go') == 0 &&
            event.text.trim().length <= 3
    );
    const indexOfInterest = useSecond ? 1 : 0;
    return potentialStarts.length > indexOfInterest
        ? Math.round(potentialStarts[indexOfInterest].timestamp)
        : NaN;
}
