import PlayerData from './PlayerData';

export type StandingValues = { wins: number; totalGames: number };
type PlayerStanding = StandingValues & PlayerData;

export default PlayerStanding;
