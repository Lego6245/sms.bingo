import React from 'react';
import { isFuture } from 'date-fns';
import TwitchChannelImage from './TwitchChannelImage';
import ExpandIcon from './ExpandIcon';
import MatchData from '../types/MatchData';
import getMatchTimeString from './helpers/getMatchTimeString';

export interface MatchRowProps {
    match: MatchData;
    forceSpoilers: boolean;
}

export default function MatchRow(props: MatchRowProps) {
    const { match } = props;
    const [isExpanded, setIsExpanded] = React.useState(false);
    const toggleExpand = React.useCallback(() => {
        setIsExpanded(!isExpanded);
    }, [isExpanded]);
    const shouldShowSpoilers = isExpanded || (match.status == 'played' && props.forceSpoilers);
    let timeContent;
    let additionalClasses = '';
    if (!!match.matchTime) {
        timeContent = getMatchTimeString(match.matchTime);
        if (!isFuture(match.matchTime * 1000)) {
            additionalClasses += ' text-gray-400';
        }
    } else {
        timeContent = 'TBD';
    }
    if (match.status == 'played') {
        additionalClasses += ' bg-blue-500';
    } else if (match.status == 'unscheduled') {
        additionalClasses += ' bg-red-300';
    } else if (match.status == 'scheduled') {
        additionalClasses += ' bg-yellow-500';
    }

    return (
        <>
            <tr
                onClick={match.status == 'played' ? toggleExpand : undefined}
                className={'h-8 sm:h-12 lg:h-16 bg-opacity-40' + additionalClasses}>
                <td className="hidden sm:table-cell">
                    {match.status == 'played' && <ExpandIcon isExpanded={shouldShowSpoilers} />}
                </td>
                <td>{timeContent}</td>
                <td
                    className={
                        'text-right' +
                        (shouldShowSpoilers && match.homePlayer == match.winner ? ' font-bold' : '')
                    }>
                    {match.homePlayer}
                </td>
                <td>Vs.</td>
                <td
                    className={
                        'text-left' +
                        (shouldShowSpoilers && match.awayPlayer == match.winner ? ' font-bold' : '')
                    }>
                    {match.awayPlayer}
                </td>
                <td className="hidden sm:table-cell">{match.division}</td>
                <td>{match.format ?? 'TBD'}</td>
                <td>
                    {match.channel ? (
                        match.channel == 'Offline' ? (
                            'Offline'
                        ) : (
                            <div className="flex flex-row justify-center">
                                <TwitchChannelImage channel={match.channel} />
                            </div>
                        )
                    ) : (
                        'TBD'
                    )}
                </td>
            </tr>
            {shouldShowSpoilers && (
                <tr className="h-16 bg-opacity-40 bg-blue-500">
                    <td className="hidden sm:table-cell"></td>
                    <td>Final Score:</td>
                    <td className="text-right">{match.homeScore}</td>
                    <td className="text-center"> - </td>
                    <td className="text-left">{match.awayScore}</td>
                    <td className="hidden sm:table-cell"></td>
                    <td></td>
                    <td>
                        <a target="_blank" href={match.matchVod}>
                            Match Vod
                        </a>
                    </td>
                </tr>
            )}
        </>
    );
}
