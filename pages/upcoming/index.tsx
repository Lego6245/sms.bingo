import { GetStaticProps } from 'next';
import ScheduleTable from '../../components/ScheduleTable';
import React from 'react';
import MatchData from '../../types/MatchData';
import Header from '../../components/Header';
import { useRouter } from 'next/router';
import convertAirtableDataToMatchData from '../../types/convertAirtableDataToMatchData';
import getBase, { getBaseName, getRevalidateTimer } from '../../data/airtable/getBase';

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
    const base = getBase();
    const matches: MatchData[] = [];
    await base(getBaseName('matches'))
        .select({
            filterByFormula:
                'AND(DATETIME_DIFF({Match Time (UTC)}, NOW(),"days") <= 7, DATETIME_DIFF({Match Time (UTC)}, NOW(),"hours") >= 0)',
            sort: [{ field: 'Match Time (UTC)' }],
        })
        .eachPage((records, fetchNextPage) => {
            records.forEach(record => {
                try {
                    matches.push(convertAirtableDataToMatchData(record));
                } catch (e) {
                    console.log(e);
                }
            });
            try {
                fetchNextPage();
            } catch (e) {
                return;
            }
        });
    return {
        props: {
            matches,
        },
        revalidate: getRevalidateTimer(),
    };
};
