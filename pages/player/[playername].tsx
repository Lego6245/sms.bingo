import { GetStaticPaths, GetStaticProps } from 'next';
import ScheduleTable from '../../components/ScheduleTable';
import importCsvForBuild from '../../scripts/importCsvForBuild';
import React from 'react';
import MatchData from '../../types/MatchData';
import PlayerData from '../../types/PlayerData';
import ProfileHeader from '../../components/ProfileHeader';
import Header from '../../components/Header';

export interface PlayerProfileProps {
    matches: MatchData[];
    record: string;
    player: PlayerData;
    formatCounts: { [key: string]: number };
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
    const playername = context.params.playername as string;
    const { matches, players } = await importCsvForBuild();
    const playerData = players.get(playername as string);
    const playerMatches = matches.filter(
        match => match.homePlayer == playername || match.awayPlayer == playername
    );
    let wins = 0;
    let played = 0;
    let formatCounts = {
        Lockout: 0,
        Invasion: 0,
        'Connect 5': 0,
        Draft: 0,
        'Row Control': 0,
    };
    playerMatches.forEach(val => {
        formatCounts[val.format]++;
        if (val.status == 'played') {
            played++;
            wins = wins + (val.winner == playername ? 1 : 0);
        }
    });
    const record = '' + wins + ' - ' + (played - wins);
    return {
        props: {
            matches: playerMatches,
            record: record,
            player: playerData,
            formatCounts,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const players = Array.from((await importCsvForBuild()).players.keys());
    const gennedPaths = players.map(player => {
        return { params: { playername: player } };
    });
    return {
        paths: gennedPaths,
        fallback: false,
    };
};
