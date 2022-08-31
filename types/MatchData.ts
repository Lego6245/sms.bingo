export default interface MatchData {
    homePlayer: string;
    homePlayerId?: string;
    awayPlayer: string;
    awayPlayerId?: string;
    week: string;
    division?: string;
    status: 'unscheduled' | 'scheduled' | 'played';
    matchTime: number;
    format:
        | 'Lockout'
        | 'Invasion'
        | 'Connect 5'
        | 'Draft'
        | 'Row Control'
        | 'Bomber'
        | 'Blockout'
        | 'TBD';
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

export interface NonLockoutMatchData {
    players: string[] | 'None';
    playerIds: string[];
    round: string;
    status: 'unscheduled' | 'scheduled' | 'played';
    matchTime: number;
    channel?: 'SunshineCommunity' | 'Bingothon' | 'Offline' | 'TBD';
    places?: string[] | 'None';
    placeIds?: string[];
    times?: string[] | 'None';
    matchVod?: string;
    commentators?: string[] | 'None';
    bingosyncBoardId?: string;
    bingosyncBoardSource?: string;
    matchId?: string;
}
