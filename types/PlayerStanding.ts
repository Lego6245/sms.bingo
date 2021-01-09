import PlayerData from './PlayerData';

export type StandingValues = { wins: number; totalGames: number };
type PlayerStanding = StandingValues & { player: PlayerData | string };

export default PlayerStanding;
