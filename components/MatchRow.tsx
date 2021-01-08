import React from "react";
import { isFuture } from 'date-fns';
import Image from "next/image";
import TwitchChannelImage from "./TwitchChannelImage";
import ExpandIcon from "./ExpandIcon";

export default function MatchRow(match: any) {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const toggleExpand = React.useCallback(() => {
        setIsExpanded(!isExpanded);
    }, [isExpanded]);
    const shouldShowSpoilers = isExpanded || (match.status == "played" && match.forceSpoilers)
    let timeContent;
    let additionalClasses = "";
    if (!!match.matchTime) {
        const matchTime = new Date(match.matchTime * 1000);
        const dateString = matchTime.toLocaleDateString(undefined, {
            month: "numeric",
            day: "numeric"
        });
        const timeString = matchTime.toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "numeric"
        });
        timeContent = dateString + '\n\r' + timeString;
        if (!isFuture(matchTime)) {
            additionalClasses += " text-gray-400"
        }
    } else {
        timeContent = "TBD"
    }
    if (match.status == "played") {
        additionalClasses += " bg-blue-500"
    } else if (match.status == "unscheduled") {
        additionalClasses += " bg-red-300"
    } else if (match.status == "scheduled") {
        additionalClasses += " bg-yellow-500"
    }
    
    return (
        <>
            <tr onClick={match.status == "played" ? toggleExpand : undefined} className={"h-16 bg-opacity-40" + additionalClasses}>
                <td>{match.status == "played" && <ExpandIcon isExpanded={shouldShowSpoilers} />}</td>
                <td>{timeContent}</td>
                <td className="text-right">{match.homePlayer}</td>
                <td>Vs.</td>
                <td className="text-left">{match.awayPlayer}</td>
                <td>{match.division}</td>
                <td>{match.format ?? 'TBD'}</td>
                <td>{match.channel ? (match.channel == "Offline" ? 'Offline' :
                    <TwitchChannelImage channel={match.channel} />
                ) : 'TBD'}</td>
            </tr>
            {shouldShowSpoilers && (
                <tr className="h-16 bg-opacity-40 bg-blue-500">
                    <td></td>
                    <td>Final Score:</td>
                    <td className="text-right">{match.homeScore}</td>
                    <td className="text-center"> - </td>
                    <td className="text-left">{match.awayScore}</td>
                    <td></td>
                    <td></td>
                    <td><a target="_blank" href={match.matchVod}>Match Vod</a></td>
                </tr>
            )}
        </>
    )
}