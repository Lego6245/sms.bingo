import { FieldSet, Record } from 'airtable';
import MatchData from './MatchData';

export default function convertAirtableDataToMatchData(record: Record<FieldSet>): MatchData {
    return {
        homePlayer: record.get('home_player_name')[0] as string,
        homePlayerId: record.get('Home Player')[0],
        awayPlayer: record.get('away_player_name')[0] as string,
        awayPlayerId: record.get('Away Player')[0],
        week: (record.get('Week') as string) ?? '',
        //division: (record.get('Division') as string) ?? '',
        status: (record.get('Status') as any).toLowerCase() ?? 'unscheduled',
        matchTime: record.get('Match Time (UTC)')
            ? Date.parse(record.get('Match Time (UTC)') as string) / 1000
            : NaN,
        format: (record.get('Match Format') as any) ?? 'TBD',
        channel: (record.get('Restream Channel') as any) ?? 'TBD',
        winner: record.get('winning_player_name')
            ? (record.get('winning_player_name')[0] as string) ?? ''
            : '',
        homeScore: (record.get('Home Score') as number) ?? NaN,
        awayScore: (record.get('Away Score') as number) ?? NaN,
        matchVod: (record.get('Vod') as string) ?? '',
        commentators: (record.get('Commentators') as string[]) ?? 'None',
        bingosyncBoardId: record.get('bingosync_slug')
            ? (record.get('bingosync_slug')[0] as string) ?? ''
            : '',
        homePlayerEloGain: (record.get('home_win_delta') as number) ?? NaN,
        awayPlayerEloGain: (record.get('away_win_delta') as number) ?? NaN,
        matchId: record.id,
    };
}
