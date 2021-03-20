import { GetStaticPaths, GetStaticProps } from 'next';
import ScheduleTable from '../../components/ScheduleTable';
import importCsvForBuild from '../../scripts/importCsvForBuild';
import React from 'react';
import MatchData from '../../types/MatchData';
import Header from '../../components/Header';
import { useRouter } from 'next/router';
import { match } from 'assert';

export interface ScheduleProps {
    matches: MatchData[];
}

export default function Schedule(props: ScheduleProps) {
    const router = useRouter();
    let matchSet = props.matches;
    if (!!router.query.broadcast) {
        matchSet = props.matches.filter(value => {
            const futureCrimp = Math.floor(Date.now() / 1000) + 60 * 60 * 12;
            return value.matchTime <= futureCrimp;
        });
    }
    return (
        <div className="bg-tile-background bg-repeat min-h-screen overflow-x-auto">
            {!router.query.broadcast && (
                <Header title="Super Mario Sunshine Bingo League - Upcoming Matches" />
            )}
            <main className="text-white flex flex-col h-full">
                <div className="sm:w-10/12 sm:mx-auto sm:my-auto">
                    {matchSet.length > 0 ? (
                        <ScheduleTable
                            matches={matchSet}
                            tableTitle={'Upcoming Matches'}
                            forBroadcast={!!router.query.broadcast}
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
