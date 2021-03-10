export default interface MatchData {
    homePlayer: string;
    awayPlayer: string;
    week: string;
    division: string;
    status: 'unscheduled' | 'scheduled' | 'played';
    matchTime: number;
    format: 'Lockout' | 'Invasion' | 'Connect 5' | 'Draft' | 'Row Control' | 'TBD';
    channel?: 'SunshineCommunity' | 'Bingothon' | 'Offline';
    winner?: string;
    homeScore?: number;
    awayScore?: number;
    matchVod?: string;
    commentators?: string[] | 'None';
}
