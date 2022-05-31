import Link from 'next/link';
import React from 'react';
import { isFuture } from 'date-fns';
import TwitchChannelImage from './TwitchChannelImage';
import ExpandIcon from './ExpandIcon';
import MatchData, { NonLockoutMatchData } from '../types/MatchData';
import TimeSlug from './TimeSlug';

export interface BaseMatchRowProps {
    match: MatchData | NonLockoutMatchData;
    forceSpoilers?: boolean;
    forBroadcast?: boolean;
}

export interface NonLockoutMatchRowProps extends BaseMatchRowProps {
    match: NonLockoutMatchData;
}

export interface LockoutMatchRowProps extends BaseMatchRowProps {
    match: MatchData;
}

export function NonLockoutMatchRow(props: NonLockoutMatchRowProps) {
    const { match, forBroadcast } = props;
    const [isExpanded, setIsExpanded] = React.useState(false);
    const toggleExpand = React.useCallback(() => {
        setIsExpanded(!isExpanded);
    }, [isExpanded]);
    const shouldShowSpoilers = isExpanded || (match.status == 'played' && props.forceSpoilers);
    let timeContent;
    let additionalClasses = '';
    if (!!match.matchTime) {
        timeContent = (
            <TimeSlug matchTime={match.matchTime} forceEst={forBroadcast} short={forBroadcast} />
        );
        if (!isFuture(match.matchTime * 1000) && match.status === 'scheduled') {
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

    const rowHeights = forBroadcast ? ' xl:h-24' : ' h-8 sm:h-12 lg:h-16';
    additionalClasses += rowHeights;

    const playerRowClasses = 'flex flex-row text-center justify-center items-center' + rowHeights;

    return (
        <>
            <tr
                onClick={match.status == 'played' ? toggleExpand : undefined}
                className={'bg-opacity-40 text-center' + additionalClasses}>
                {!forBroadcast && (
                    <td className="hidden sm:table-cell">
                        {match.status == 'played' && <ExpandIcon isExpanded={shouldShowSpoilers} />}
                    </td>
                )}
                <td>{shouldShowSpoilers ? 'Finish Order:' : timeContent}</td>
                <td className={playerRowClasses}>
                    {shouldShowSpoilers
                        ? match.places && match.places != 'None'
                            ? match.places.map((player, index) => (
                                  <div className="w-0 flex-grow" key={player}>
                                      <Link href={'/non-lockout/player/' + match.placeIds[index]}>
                                          {nth(index + 1) + player}
                                      </Link>
                                  </div>
                              ))
                            : 'TBD'
                        : match.players != 'None'
                        ? match.players.map((player, index) => (
                              <div className="w-0 flex-grow" key={player}>
                                  <Link href={'/non-lockout/player/' + match.playerIds[index]}>
                                      {player}
                                  </Link>
                              </div>
                          ))
                        : 'None'}
                </td>
                <td>
                    {shouldShowSpoilers ? (
                        match.matchVod ? (
                            <a className="cursor-pointer" target="_blank" href={match.matchVod}>
                                Match Vod
                            </a>
                        ) : match.channel === 'Offline' ? (
                            'No VOD'
                        ) : (
                            'Match VOD Soon'
                        )
                    ) : match.channel ? (
                        match.channel == 'Offline' || match.channel == 'TBD' ? (
                            match.channel
                        ) : (
                            <div className="flex flex-row justify-center">
                                <TwitchChannelImage
                                    channel={match.channel}
                                    forBroadcast={forBroadcast}
                                />
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
                    <td className="text-center">Final Times:</td>
                    <td className={playerRowClasses}>
                        {match.times && match.times != 'None'
                            ? match.times.map(player => (
                                  <div className="w-0 flex-grow" key={player}>
                                      {player}
                                  </div>
                              ))
                            : 'TBD'}
                    </td>
                    <td className={'text-center'}>
                        <Link href={'/match/' + match.matchId}>
                            <span className="cursor-pointer">{'Board Details'}</span>
                        </Link>
                    </td>
                </tr>
            )}
        </>
    );
}

export default function MatchRow(props: LockoutMatchRowProps) {
    const { match, forBroadcast } = props;
    const [isExpanded, setIsExpanded] = React.useState(false);
    const toggleExpand = React.useCallback(() => {
        setIsExpanded(!isExpanded);
    }, [isExpanded]);
    const shouldShowSpoilers = isExpanded || (match.status == 'played' && props.forceSpoilers);
    let timeContent;
    let additionalClasses = '';
    if (!!match.matchTime) {
        timeContent = (
            <TimeSlug matchTime={match.matchTime} forceEst={forBroadcast} short={forBroadcast} />
        );
        if (!isFuture(match.matchTime * 1000) && match.status === 'scheduled') {
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

    if (forBroadcast) {
        additionalClasses += ' xl:h-24';
    }

    const homeClassName =
        'text-right' +
        (shouldShowSpoilers && match.homePlayer == match.winner ? ' font-bold bg-yellow-600' : '');

    const awayClassName =
        'text-left' +
        (shouldShowSpoilers && match.awayPlayer == match.winner ? ' font-bold bg-yellow-600' : '');

    return (
        <>
            <tr
                onClick={match.status == 'played' ? toggleExpand : undefined}
                className={'h-8 sm:h-12 lg:h-16 bg-opacity-40 text-center' + additionalClasses}>
                {!forBroadcast && (
                    <td className="hidden sm:table-cell">
                        {match.status == 'played' && <ExpandIcon isExpanded={shouldShowSpoilers} />}
                    </td>
                )}
                <td>{timeContent}</td>
                <td className={homeClassName}>
                    <Link href={'/player/' + match.homePlayerId ?? match.homePlayer}>
                        <span className="cursor-pointer">{match.homePlayer}</span>
                    </Link>
                </td>
                <td>Vs.</td>
                <td className={awayClassName}>
                    <Link href={'/player/' + match.awayPlayerId ?? match.awayPlayer}>
                        <span className="cursor-pointer">{match.awayPlayer}</span>
                    </Link>
                </td>
                {/* <td className="hidden sm:table-cell">{match.division}</td> */}
                <td>{match.format ?? 'TBD'}</td>
                <td>
                    {match.channel ? (
                        match.channel == 'Offline' || match.channel == 'TBD' ? (
                            match.channel
                        ) : (
                            <div className="flex flex-row justify-center">
                                <TwitchChannelImage
                                    channel={match.channel}
                                    forBroadcast={forBroadcast}
                                />
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
                    <td className="text-center">Final Score:</td>
                    <td className={homeClassName}>{match.homeScore}</td>
                    <td className="text-center"> - </td>
                    <td className={awayClassName}>{match.awayScore}</td>
                    {/* <td className="hidden sm:table-cell"></td> */}
                    <td className={'text-center'}>
                        <Link href={'/match/' + match.matchId}>
                            <span className="cursor-pointer">{'Board Details'}</span>
                        </Link>
                    </td>
                    <td className={'text-center'}>
                        {match.matchVod ? (
                            <a className="cursor-pointer" target="_blank" href={match.matchVod}>
                                Match Vod
                            </a>
                        ) : match.channel === 'Offline' ? (
                            'No VOD'
                        ) : (
                            'Match VOD Soon'
                        )}
                    </td>
                </tr>
            )}
        </>
    );
}

// shamlessly stolen from https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
function nth(n) {
    if (n <= 3) {
        switch (n) {
            case 1:
                return '🥇';
            case 2:
                return '🥈';
            case 3:
                return '🥉';
        }
    }
    return n + ['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th' + ': ';
}
