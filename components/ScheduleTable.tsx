export interface ScheduleTableProps {
    matches: MatchData[];
    tableTitle: string;
    forceSpoilers?: boolean;
    hideHomeAway?: boolean;
    forBroadcast?: boolean;
}
import MatchData from '../types/MatchData';
import MatchRow from './MatchRow';

export default function ScheduleTable(props: ScheduleTableProps) {
    const titleClassName = props.forBroadcast ? 'text-5xl' : 'text-3xl';
    const theadClassName = props.forBroadcast
        ? 'text-3xl'
        : 'text-xs sm:text-sm md:text-lg lg:text-2xl';
    const tbodyClassName = props.forBroadcast
        ? 'text-3xl'
        : 'text-xs sm:text-sm md:text-lg lg:text-xl';
    return (
        <div className="text-white">
            <div className={titleClassName + ' mx-auto text-center mb-5 font-bold'}>
                {props.tableTitle}
            </div>
            <table className="w-full mx-auto table-auto sm:table-fixed">
                <thead className={theadClassName + ' bg-opacity-40 bg-yellow-700'}>
                    <tr>
                        {!props.forBroadcast && (
                            <th className="hidden sm:w-1/12 sm:table-cell"></th>
                        )}
                        <th className="w-1/12 sm:w-2/12 mx-2">Time</th>
                        <th className="w-3/12 sm:w-2/12 mx-2 text-right">
                            {props.hideHomeAway ? '' : 'Home'}
                        </th>
                        <th className="w-1/12"></th>
                        <th className="w-3/12 sm:w-2/12 text-left mx-2">
                            {props.hideHomeAway ? '' : 'Away'}
                        </th>
                        <th className="w-1/12 mx-2 hidden sm:table-cell">Division</th>
                        <th className="w-2/12 mx-2">Format</th>
                        <th className="w-2/12 mx-2">Channel</th>
                    </tr>
                </thead>
                <tbody className={tbodyClassName}>
                    {props.matches.length > 0 &&
                        props.matches.map(match => (
                            <MatchRow
                                key={match.homePlayer + match.awayPlayer + match.matchTime}
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
