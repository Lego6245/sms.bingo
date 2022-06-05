import React from 'react';
import MatchData, { NonLockoutMatchData } from '../types/MatchData';
import MatchRow, { BaseMatchRowProps, NonLockoutMatchRow } from './MatchRow';

interface ScheduleTablePropsShared {
    matches: MatchData[] | NonLockoutMatchData[];
    tableTitle: string;
    forceSpoilers?: boolean;
    hideHomeAway?: boolean;
    forBroadcast?: boolean;
}

export interface ScheduleTableProps extends ScheduleTablePropsShared {
    matches: MatchData[];
}

export interface NonLockoutScheduleTableProps extends ScheduleTablePropsShared {
    matches: NonLockoutMatchData[];
}

interface InternalScheduleTableProps extends ScheduleTablePropsShared {
    header: React.ReactNode;
    row: React.ComponentType<BaseMatchRowProps>;
}

export function NonLockoutScheduleTable(props: NonLockoutScheduleTableProps) {
    const theadClassName = props.forBroadcast
        ? 'text-3xl'
        : 'text-xs sm:text-sm md:text-lg lg:text-2xl';
    const tableHeader = (
        <thead className={theadClassName + ' bg-opacity-40 bg-yellow-700'}>
            <tr>
                {!props.forBroadcast && <th className="hidden sm:w-1/12 sm:table-cell"></th>}
                <th className="w-1/12 sm:w-2/12 mx-2">Time</th>
                <th className="w-2/3 mx-2 text-center">Players</th>
                <th className="w-2/12 mx-2">Channel</th>
            </tr>
        </thead>
    );
    return <InternalScheduleTable {...props} header={tableHeader} row={NonLockoutMatchRow} />;
}

export default function ScheduleTable(props: ScheduleTableProps) {
    const theadClassName = props.forBroadcast
        ? 'text-3xl'
        : 'text-xs sm:text-sm md:text-lg lg:text-2xl';
    const tableHeader = (
        <thead className={theadClassName + ' bg-opacity-40 bg-yellow-700'}>
            <tr>
                {!props.forBroadcast && <th className="hidden sm:w-1/12 sm:table-cell"></th>}
                <th className="w-1/12 sm:w-2/12 mx-2">Time</th>
                <th className="w-3/12 sm:w-2/12 mx-2 text-right">
                    {props.hideHomeAway ? '' : 'Home'}
                </th>
                <th className="w-1/12"></th>
                <th className="w-3/12 sm:w-2/12 text-left mx-2">
                    {props.hideHomeAway ? '' : 'Away'}
                </th>
                {/* <th className="w-1/12 mx-2 hidden sm:table-cell">Division</th> */}
                <th className="w-2/12 mx-2">Format</th>
                <th className="w-2/12 mx-2">Channel</th>
            </tr>
        </thead>
    );
    return <InternalScheduleTable {...props} header={tableHeader} row={MatchRow} />;
}

function InternalScheduleTable(props: InternalScheduleTableProps) {
    const titleClassName = props.forBroadcast ? 'text-5xl' : 'text-3xl';
    const tbodyClassName = props.forBroadcast
        ? 'text-3xl'
        : 'text-xs sm:text-sm md:text-lg lg:text-xl';
    return (
        <div className="text-white">
            <div className={titleClassName + ' mx-auto text-center mb-5 font-bold'}>
                {props.tableTitle}
            </div>
            <table className="w-full mx-auto table-auto sm:table-fixed">
                {props.header}
                <tbody className={tbodyClassName}>
                    {props.matches.length > 0 &&
                        (props.matches as (MatchData | NonLockoutMatchData)[]).map(match => (
                            <props.row
                                key={match.matchId}
                                match={match}
                                forceSpoilers={props.forceSpoilers}
                                forBroadcast={props.forBroadcast}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    );
}
