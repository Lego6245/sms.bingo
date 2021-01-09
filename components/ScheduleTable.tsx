export interface ScheduleTableProps {
    matches: MatchData[];
    tableTitle: string;
    forceSpoilers: boolean;
}
import MatchData from '../types/MatchData';
import MatchRow from './MatchRow';

export default function ScheduleTable(props: ScheduleTableProps) {
    return (
        <div className="text-white">
        <div className="mx-auto text-3xl text-center mb-5 font-bold">{props.tableTitle}</div>
        <table className="w-full mx-auto table-auto sm:table-fixed">
            <thead className="text-xs sm:text-sm md:text-lg lg:text-2xl bg-opacity-40 bg-yellow-700">
                <tr>
                    <th className="hidden sm:table-cell"></th>
                    <th className="w-1/12 mx-2">Time</th>
                    <th className="w-3/12 sm:w-2/13 mx-2 text-right">Home</th>
                    <th className="w-1/12"></th>
                    <th className="w-3/12 sm:w-2/13 text-left mx-2">Away</th>
                    <th className="w-1/12 mx-2 hidden sm:table-cell">Division</th>
                    <th className="w-2/12 mx-2">Format</th>
                    <th className="w-2/12 mx-2">Channel</th>
                </tr>
            </thead>
            <tbody className="text-center text-xs sm:text-sm md:text-lg lg:text-xl">
                {props.matches.length > 0 && props.matches.map(match => (
                    <MatchRow match={match} forceSpoilers={props.forceSpoilers} />
                ))}
            </tbody>
        </table>
    </div>
    )
}