export default interface MatchData {
    homePlayer: string;
    homePlayerId?: string;
    awayPlayer: string;
    awayPlayerId?: string;
    week: string;
    division?: string;
    status: 'unscheduled' | 'scheduled' | 'played';
    matchTime: number;
    format: 'Lockout' | 'Invasion' | 'Connect 5' | 'Draft' | 'Row Control' | 'TBD';
    channel?: 'SunshineCommunity' | 'Bingothon' | 'Offline' | 'TBD';
    winner?: string;
    homeScore?: number;
    awayScore?: number;
    matchVod?: string;
    commentators?: string[] | 'None';
    bingosyncBoardId?: string;
    bingosyncBoardSource?: string;
    homePlayerEloGain?: number;
    awayPlayerEloGain?: number;
    matchId?: string;
}
