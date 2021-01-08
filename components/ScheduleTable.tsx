export interface ScheduleTableProps {
    matches: any[];
    tableTitle: string;
    forceSpoilers: boolean;
}
import MatchRow from './MatchRow';

export default function ScheduleTable(props: ScheduleTableProps) {
    return (
        <div className="text-white">
        <div className="w-10/12 mx-auto text-3xl text-center mb-5 font-bold">{props.tableTitle}</div>
        <table className="w-10/12 mx-auto table-fixed">
            <thead className="text-2xl bg-opacity-40 bg-yellow-700">
                <tr>
                    <th>Spoilers</th>
                    <th className="w-2/12">Time</th>
                    <th className="w-2/12 text-right">Home</th>
                    <th></th>
                    <th className="w-2/12 text-left">Away</th>
                    <th>Division</th>
                    <th className="w-2/12">Format</th>
                    <th className="w-1/12">Channel</th>
                </tr>
            </thead>
            <tbody className="text-center text-xl">
                {props.matches.length > 0 && props.matches.map(match => (
                    <MatchRow {...match} forceSpoilers={props.forceSpoilers} />
                ))}
            </tbody>
        </table>
    </div>
    )
}