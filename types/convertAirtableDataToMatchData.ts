import { FieldSet, Record } from 'airtable';
import MatchData, { NonLockoutMatchData } from './MatchData';

export default function convertAirtableDataToMatchData(record: Record<FieldSet>): MatchData;
export default function convertAirtableDataToMatchData(
    record: Record<FieldSet>,
    nonLockout: true
): NonLockoutMatchData;
export default function convertAirtableDataToMatchData(
    record: Record<FieldSet>,
    nonLockout?: true
) {
    if (!!nonLockout) {
        return convertAirtableDataToMatchDataNonLockout(record);
    } else {
        return convertAirtableDataToMatchDataLockout(record);
    }
}

function convertAirtableDataToMatchDataNonLockout(record: Record<FieldSet>): NonLockoutMatchData {
    return {
        players: record.get('player_names') as string[],
        playerIds: (record.get('Players') as string[]) ?? [],
        round: (record.get('Round') as string) ?? '',
        status: (record.get('Status') as any).toLowerCase() ?? 'unscheduled',
        matchTime: record.get('Match Time (UTC)')
            ? Date.parse(record.get('Match Time (UTC)') as string) / 1000
            : NaN,
        channel: (record.get('Restream Channel') as any) ?? 'TBD',
        places: (record.get('placing_order') as string[]) ?? [],
        placeIds: (record.get('Placing') as string[]) ?? [],
        times: (record.get('Times') as string[]) ?? [],
        matchVod: (record.get('Vod') as string) ?? '',
        commentators: (record.get('Commentators') as string[]) ?? 'None',
        bingosyncBoardId: record.get('bingosync_slug')
            ? (record.get('bingosync_slug')[0] as string) ?? ''
            : '',
        bingosyncBoardSource: (record.get('Bingosync Source') as string) ?? '',
        matchId: record.id,
    };
}

function convertAirtableDataToMatchDataLockout(record: Record<FieldSet>): MatchData {
    return {
        homePlayer: record.get('home_player_name')[0] as string,
        homePlayerId: record.get('Home Player')[0],
        awayPlayer: record.get('away_player_name')[0] as string,
        awayPlayerId: record.get('Away Player')[0],
        week: (record.get('Week') as string) ?? '',
        division: (record.get('Division') as string) ?? '',
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
        bingosyncBoardSource: (record.get('Bingosync Source') as string) ?? '',
        homePlayerEloGain: (record.get('home_win_delta') as number) ?? NaN,
        awayPlayerEloGain: (record.get('away_win_delta') as number) ?? NaN,
        matchId: record.id,
    };
}
