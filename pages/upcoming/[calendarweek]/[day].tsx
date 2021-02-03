import { GetStaticPaths, GetStaticProps } from 'next';
import ScheduleTable from '../../../components/ScheduleTable';
import importCsvForBuild from '../../../scripts/importCsvForBuild';
import React from 'react';
import MatchData from '../../../types/MatchData';
import ScheduleSlots from '../../../consts/ScheduleSlots';

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
    const matches = (await importCsvForBuild()).matches;
    const dateFactor = (parseInt(calendarweek as string) - 1) * 604800; // Constant of 1 week.
    const firstTimestamp = ScheduleSlots.get(day as string)[0] + dateFactor - 60 * 60 * 2;
    const lastTimestamp =
        ScheduleSlots.get(day as string)[ScheduleSlots.get(day as string).length - 1] +
        dateFactor +
        60 * 60 * 2;
    let onlyScheduled = matches.filter(
        match =>
            match.status != 'unscheduled' &&
            match.matchTime >= firstTimestamp &&
            match.matchTime <= lastTimestamp &&
            match.channel != 'Offline'
    );
    return {
        props: {
            matches: onlyScheduled,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const calendarWeeks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const scheduleSlotDays = Array.from(ScheduleSlots.keys());
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
