import MatchData from './MatchData';

export default function convertAirtableDataToMatchData(record: any): MatchData {
    return {
        homePlayer: record.get('home_player_name') as string,
        homePlayerId: record.get('Home Player')[0],
        awayPlayer: record.get('away_player_name') as string,
        awayPlayerId: record.get('Away Player')[0],
        week: (record.get('Week') as string) ?? '',
        //division: (record.get('Division') as string) ?? '',
        status: (record.get('Status') as any) ?? 'unscheduled',
        matchTime: record.get('Match Time (UTC)')
            ? Date.parse(record.get('Match Time (UTC)') as string) / 1000
            : NaN,
        format: (record.get('Match Format') as any) ?? 'TBD',
        channel: (record.get('Restream Channel') as any) ?? 'Offline',
        winner: (record.get('winning_player_name') as string) ?? '',
        homeScore: (record.get('Home Score') as number) ?? NaN,
        awayScore: (record.get('Away Score') as number) ?? NaN,
        matchVod: (record.get('Vod') as string) ?? '',
        commentators: (record.get('Commentators') as string[]) ?? 'None',
    };
}
