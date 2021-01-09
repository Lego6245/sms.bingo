export default function getMatchTimeString(rawTime: number, est?: boolean): string {
    const matchTime = new Date(rawTime * 1000);
    const dateString = matchTime.toLocaleDateString(undefined, {
        month: 'numeric',
        day: 'numeric',
        timeZone: est ? 'America/New_York' : undefined,
    });
    const timeString = matchTime.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: est ? 'America/New_York' : undefined,
    });
    console.log(dateString + '\n\r' + timeString);
    return dateString + '\n\r' + timeString;
}
