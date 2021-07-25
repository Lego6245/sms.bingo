import Airtable from 'airtable';
import convertAirtableDataToMatchData from '../types/convertAirtableDataToMatchData';
import convertAirtableDataToPlayerData from '../types/convertAirtableDataToPlayerData';
import MatchData from '../types/MatchData';
import PlayerData from '../types/PlayerData';

export interface DataImport {
    matches: MatchData[];
    players: Map<string, PlayerData>;
}

export default async function fetchAllS3Data(): Promise<DataImport> {
    const matchArray: MatchData[] = [];
    const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
    await base('Season 3 Matches')
        .select()
        .eachPage((records, fetchNextPage) => {
            try {
                records.forEach(record => {
                    matchArray.push(convertAirtableDataToMatchData(record));
                });
                fetchNextPage();
            } catch (e) {
                return;
            }
        });
    console.log(matchArray[0]);
    const playerMap = new Map<string, PlayerData>();
    await base('Season 3 Players')
        .select()
        .eachPage((records, fetchNextPage) => {
            records.forEach(record => {
                playerMap.set(record.id, convertAirtableDataToPlayerData(record));
            });
            try {
                fetchNextPage();
            } catch {
                return;
            }
        });
    return {
        matches: matchArray,
        players: playerMap,
    };
}
