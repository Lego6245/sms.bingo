import { GetStaticPaths, GetStaticProps } from 'next';
import ScheduleTable from '../../../components/ScheduleTable';
import React from 'react';
import MatchData from '../../../types/MatchData';
import convertAirtableDataToMatchData from '../../../types/convertAirtableDataToMatchData';
import getBase, { getBaseName, getRevalidateTimer } from '../../../data/airtable/getBase';

export interface ScheduleProps {
    matches: MatchData[];
    title: string;
}

const arrayOfWeekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

export default function Schedule(props: ScheduleProps) {
    return (
        <div className="bg-tile-background bg-repeat min-h-screen overflow-x-auto">
            <main className="text-white flex flex-col h-screen">
                <div className="sm:w-10/12 sm:mx-auto sm:my-auto">
                    <ScheduleTable
                        matches={props.matches}
                        tableTitle={props.title}
                        forBroadcast={true}
                    />
                </div>
            </main>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async context => {
    const day = context.params['dayOfWeek'] as string;
    const nowInEST = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const timeZoneOffset = (nowInEST.getTimezoneOffset() / 60) * -1;
    const dayDelta =
        day == 'today'
            ? 0
            : day == 'tomorrow'
            ? 1
            : parseInt(day as string) - nowInEST.getDay() + 1;
    const base = getBase();
    const matches: MatchData[] = [];
    await base(getBaseName('matches'))
        .select({
            filterByFormula: `AND(IS_SAME({Match Time (EST)}, DATEADD(DATEADD(TODAY(), ${timeZoneOffset}, "hours"), ${dayDelta}, "days"), "day"), OR({Restream Channel} = "Bingothon", {Restream Channel} = "SunshineCommunity"))`,
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
            title:
                day == 'today'
                    ? "Today's Matches"
                    : day == 'tomorrow'
                    ? "Tomorrow's Matches"
                    : `${arrayOfWeekdays[parseInt(day)]}'s Matches`,
        },
        revalidate: getRevalidateTimer(),
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const dayOfWeek = ['today', 'tomorrow', '0', '1', '2', '3', '4', '5', '6'];
    const genedPaths = dayOfWeek.map(day => ({
        params: {
            dayOfWeek: day,
        },
    }));
    return {
        paths: genedPaths,
        fallback: false,
    };
};
