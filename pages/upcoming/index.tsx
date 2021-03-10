import { GetStaticPaths, GetStaticProps } from 'next';
import ScheduleTable from '../../components/ScheduleTable';
import importCsvForBuild from '../../scripts/importCsvForBuild';
import React from 'react';
import MatchData from '../../types/MatchData';
import ScheduleSlots from '../../consts/ScheduleSlots';
import Header from '../../components/Header';

export interface ScheduleProps {
    matches: MatchData[];
}

export default function Schedule(props: ScheduleProps) {
    return (
        <div className="bg-tile-background bg-repeat min-h-screen overflow-x-auto">
            <Header title="Super Mario Sunshine Bingo League - Upcoming Matches" />
            <main className="text-white flex flex-col h-full">
                <div className="sm:w-10/12 sm:mx-auto sm:my-auto">
                    {props.matches.length > 0 ? (
                        <ScheduleTable
                            matches={props.matches}
                            tableTitle={'Upcoming Matches'}
                            forBroadcast={false}
                        />
                    ) : (
                        <div className="text-3xl mx-auto text-center mb-5 font-bold">
                            No matches currently scheduled, check back later!
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async context => {
    const matches = (await importCsvForBuild()).matches;
    const firstTimestamp = Math.floor(Date.now() / 1000) - 60 * 60 * 2;
    const lastTimestamp = Math.floor(Date.now() / 1000) + 604800;
    let onlyScheduled = matches
        .filter(
            match =>
                match.status != 'unscheduled' &&
                match.matchTime >= firstTimestamp &&
                match.matchTime <= lastTimestamp &&
                match.channel != 'Offline'
        )
        .sort((a, b) => {
            return !!a.matchTime ? (!!b.matchTime ? a.matchTime - b.matchTime : -1) : 1;
        });
    return {
        props: {
            matches: onlyScheduled,
        },
    };
};
