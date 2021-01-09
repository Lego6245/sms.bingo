export default interface MatchData {
    homePlayer: string;
    awayPlayer: string;
    week: number;
    division: string;
    status: 'unscheduled' | 'scheduled' | 'played';
    matchTime: number;
    format: string;
    channel: 'SunshineCommunity' | 'Bingothon' | 'Offline';
    winner: string;
    homeScore: number;
    awayScore: number;
    matchVod: string;
    commentators: string[] | 'None';
}
