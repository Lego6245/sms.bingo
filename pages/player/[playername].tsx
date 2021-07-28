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

export interface PlayerProfileProps {
    matches: MatchData[];
    record: string;
    player: PlayerData;
}

export default function PlayerProfile(props: PlayerProfileProps) {
    return (
        <div className="bg-tile-background bg-repeat min-h-screen overflow-x-auto">
            <Header
                title={
                    'Super Mario Sunshine Bingo League - Player Profile - ' +
                    encodeURI(props.player.name)
                }
            />
            <main className="text-white flex flex-col h-screen">
                <div className="sm:w-10/12 sm:mx-auto">
                    <ProfileHeader playerData={props.player} subHeader={props.record} />
                    <ScheduleTable matches={props.matches} tableTitle={'Match History'} />
                </div>
            </main>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async context => {
    const playerId = context.params.playername as string;
    const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
    const playerRecord = await base('Season 3 Players').find(playerId);
    const playerData = convertAirtableDataToPlayerData(playerRecord);
    const matchIds = [
        ...((playerRecord.get('Home Matches') as string[]) ?? []),
        ...((playerRecord.get('Away Matches') as string[]) ?? []),
    ];
    const playerMatches: MatchData[] = await Promise.all(
        matchIds.map(async id => {
            return convertAirtableDataToMatchData(await base('Season 3 Matches').find(id));
        })
    );
    const sortedPlayerMatches = playerMatches.sort((a, b) => a.matchTime - b.matchTime);
    return {
        props: {
            matches: sortedPlayerMatches,
            record: playerData.elo,
            player: playerData,
        },
        revalidate: 60,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
    const playerIds: string[] = [];
    await base('Season 3 Players')
        .select({
            fields: [],
        })
        .eachPage((records, fetchNextPage) => {
            records.forEach(record => {
                playerIds.push(record.id);
            });
            try {
                fetchNextPage();
            } catch {
                return;
            }
        });
    const gennedPaths = playerIds.map(id => {
        return { params: { playername: id } };
    });
    return {
        paths: gennedPaths,
        fallback: false,
    };
};
