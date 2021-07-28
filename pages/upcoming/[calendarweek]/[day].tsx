import { GetStaticPaths, GetStaticProps } from 'next';
import ScheduleTable from '../../../components/ScheduleTable';
import React from 'react';
import MatchData from '../../../types/MatchData';
import Airtable from 'airtable';
import convertAirtableDataToMatchData from '../../../types/convertAirtableDataToMatchData';

export interface ScheduleProps {
    matches: MatchData[];
}

export default function Schedule(props: ScheduleProps) {
    return (
        <div className="bg-tile-background bg-repeat min-h-screen overflow-x-auto">
            <main className="text-white flex flex-col h-screen">
                <div className="sm:w-10/12 sm:mx-auto sm:my-auto">
                    <ScheduleTable
                        matches={props.matches}
                        tableTitle={"Today's Matches"}
                        forBroadcast={true}
                    />
                </div>
            </main>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async context => {
    const { calendarweek, day } = context.params;
    const WEEK_OF_YEAR_START = 29;
    const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
    const matches: MatchData[] = [];
    await base('Season 3 Matches')
        .select({
            filterByFormula: `AND(WEEKDAY({Match Time (EST)}, "Monday") = ${
                parseInt(day as string) + 1
            }, WEEKNUM({Match Time (EST)}, "Monday") = ${
                WEEK_OF_YEAR_START + parseInt(calendarweek as string)
            }, OR({Restream Channel} = "Bingothon", {Restream Channel} = "SunshineCommunity"))`,
            sort: [{ field: 'Match Time (UTC)' }],
        })
        .eachPage((records, fetchNextPage) => {
            try {
                records.forEach(record => {
                    matches.push(convertAirtableDataToMatchData(record));
                });
                fetchNextPage();
            } catch (e) {
                return;
            }
        });
    return {
        props: {
            matches: matches,
        },
        revalidate: 60,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const calendarWeeks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const scheduleSlotDays = ['1', '2', '3', '4', '5'];
    const genedPaths = [];
    calendarWeeks.forEach(week => {
        scheduleSlotDays.forEach(day => {
            genedPaths.push({ params: { calendarweek: week, day: day } });
        });
    });
    return {
        paths: genedPaths,
        fallback: false,
    };
};
