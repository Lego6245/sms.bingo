export default function getMatchTimeString(
    rawTime: number,
    est?: boolean,
    short?: boolean
): string {
    const matchTime = new Date(rawTime * 1000);
    const dateString = matchTime.toLocaleDateString(undefined, {
        weekday: short ? undefined : 'short',
        month: 'numeric',
        day: 'numeric',
        timeZone: est ? 'America/New_York' : undefined,
    });
    const timeString = matchTime.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: est ? 'America/New_York' : undefined,
        timeZoneName: short ? undefined : 'short',
    });
    return dateString + '\n\r' + timeString;
}
