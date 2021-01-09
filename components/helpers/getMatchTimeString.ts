export default function getMatchTimeString(rawTime: number): string {
    const matchTime = new Date(rawTime * 1000);
    const dateString = matchTime.toLocaleDateString(undefined, {
        month: 'numeric',
        day: 'numeric',
    });
    const timeString = matchTime.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: 'numeric',
    });
    return dateString + '\n\r' + timeString;
}
