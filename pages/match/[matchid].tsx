import { GetStaticPaths, GetStaticProps } from 'next';
import ScheduleTable from '../../components/ScheduleTable';
import React from 'react';
import MatchData from '../../types/MatchData';
import PlayerData from '../../types/PlayerData';
import ProfileHeader from '../../components/ProfileHeader';
import Header from '../../components/Header';
import Airtable from 'airtable';
import convertAirtableDataToPlayerData from '../../types/convertAirtableDataToPlayerData';
import convertAirtableDataToMatchData from '../../types/convertAirtableDataToMatchData';
import Board from '../../components/Board';
import useSWR from 'swr';
import PlayerHeader from '../../components/PlayerHeader';
import TimeSlug from '../../components/TimeSlug';

const fetcher = (...args) => (fetch as Function)(...args).then(res => res.json());

export interface MatchDataProps {
    matchData: MatchData;
    homePlayerData: PlayerData;
    awayPlayerData: PlayerData;
}

export default function MatchView(props: MatchDataProps) {
    const { matchData, homePlayerData, awayPlayerData } = props;
    const boardId = matchData.bingosyncBoardId;
    const { data, error } = useSWR(`/api/matchData/${boardId}`, fetcher);
    let eloSlug = '';
    if (matchData.winner == matchData.homePlayer && matchData.homePlayerEloGain) {
        eloSlug = `+${matchData.homePlayerEloGain} Elo`;
    } else if (matchData.winner == matchData.awayPlayer && matchData.awayPlayerEloGain) {
        eloSlug = `-${matchData.awayPlayerEloGain} Elo`;
    }
    return (
        <div className="bg-tile-background bg-repeat min-h-screen overflow-x-auto">
            <Header title={'Super Mario Sunshine Bingo League - Match Info'} />
            <main className="text-white flex flex-col h-screen">
                <div className="flex mx-auto w-1/2">
                    <div className="mx-auto w-2/5">
                        <PlayerHeader
                            playerName={homePlayerData.name}
                            playerId={homePlayerData.id}
                            bingosyncColorPrimary={homePlayerData.primaryColor}
                            bingosyncColorSecondary={homePlayerData.secondaryColor}
                            countryCode={homePlayerData.country}
                            subHeader={'' + matchData.homeScore}
                        />
                    </div>
                    <div className="m-auto text-2xl">{'Vs.'}</div>
                    <div className="mx-auto w-2/5">
                        <PlayerHeader
                            playerName={awayPlayerData.name}
                            playerId={awayPlayerData.id}
                            bingosyncColorPrimary={awayPlayerData.primaryColor}
                            bingosyncColorSecondary={awayPlayerData.secondaryColor}
                            countryCode={awayPlayerData.country}
                            subHeader={'' + matchData.awayScore}
                        />
                    </div>
                </div>
                <div className="flex mx-auto w-1/2">
                    <div className="w-2/5 text-center text-xl">
                        <TimeSlug matchTime={matchData.matchTime} />
                    </div>
                    <div className="w-1/5 text-center text-xl">{eloSlug}</div>
                    <div className="w-2/5 text-center text-xl">
                        <span>{matchData.format}</span>
                    </div>
                </div>
                <div className="flex mx-auto w-1/2 mt-3">
                    <div className="w-1/2 text-center text-l">
                        <span>
                            {matchData.commentators == 'None'
                                ? 'No Commentary'
                                : `Commentary: ${matchData.commentators.join(', ')}`}
                        </span>
                    </div>
                    <div className="w-1/2 text-center text-l">
                        {matchData.matchVod ? (
                            <a className="cursor-pointer" target="_blank" href={matchData.matchVod}>
                                Match Vod
                            </a>
                        ) : matchData.channel === 'Offline' ? (
                            'No VOD'
                        ) : (
                            'Match VOD Soon'
                        )}
                    </div>
                </div>
                <div
                    className="mx-auto mt-6"
                    style={{
                        height: '600px',
                        width: '600px',
                    }}>
                    {error ? (
                        <div>No board data for this match</div>
                    ) : !data ? (
                        <div>Loading board data...</div>
                    ) : (
                        <Board
                            boardJson={data.raw_board_data}
                            goalFeed={data.goal_feed_data}
                            startTimestamp={data.detected_start_timestamp}
                            matchFormat={matchData.format}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async context => {
    const matchId = context.params.matchid as string;
    const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
    const matchData = convertAirtableDataToMatchData(await base('Season 3 Matches').find(matchId));
    const homePlayerData = convertAirtableDataToPlayerData(
        await base('Season 3 Players').find(matchData.homePlayerId)
    );
    const awayPlayerData = convertAirtableDataToPlayerData(
        await base('Season 3 Players').find(matchData.awayPlayerId)
    );
    return {
        props: {
            matchData,
            homePlayerData,
            awayPlayerData,
        },
        revalidate: 60,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
    const matchIds: string[] = [];
    await base('Season 3 Matches')
        .select({
            fields: [],
        })
        .eachPage((records, fetchNextPage) => {
            records.forEach(record => {
                matchIds.push(record.id);
            });
            try {
                fetchNextPage();
            } catch {
                return;
            }
        });
    const gennedPaths = matchIds.map(id => {
        return { params: { matchid: id } };
    });
    return {
        paths: gennedPaths,
        fallback: false,
    };
};
