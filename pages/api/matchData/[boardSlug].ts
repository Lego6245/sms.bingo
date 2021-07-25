import got, { ToughCookieJar } from 'got';
import { CookieJar } from 'tough-cookie';
import Airtable from 'airtable';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { boardSlug } = req.query;
    const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
    let matchData;
    try {
        matchData = await base('Season 3 Match Data')
            .select({
                filterByFormula: '{bingosync_slug} = "' + boardSlug + '"',
                maxRecords: 1,
                fields: [
                    'raw_feed_data',
                    'raw_board_data',
                    'raw_settings_data',
                    'bingosync_password',
                ],
            })
            .all();
    } catch (e) {
        console.log(e);
        // failed here
    }
    if (!!matchData && matchData.length > 0) {
        const {
            raw_feed_data,
            raw_board_data,
            raw_settings_data,
            bingosync_password,
        } = matchData[0].fields;
        const airtable_matchdata_id = matchData[0].id;
        if (!!raw_board_data) {
            res.json({
                boardSlug: boardSlug,
                raw_feed_data: JSON.parse(raw_feed_data),
                raw_board_data: JSON.parse(raw_board_data),
                raw_settings_data: JSON.parse(raw_settings_data),
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
                    await base('Season 2 Match Data').update(airtable_matchdata_id, {
                        raw_feed_data: JSON.stringify(feedData.body),
                        raw_board_data: JSON.stringify(boardData.body),
                        raw_settings_data: JSON.stringify(settingsData.body),
                    });

                    res.json({
                        boardSlug: boardSlug,
                        raw_feed_data: feedData.body,
                        raw_board_data: boardData.body,
                        raw_settings_data: settingsData.body,
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
