import { GetStaticProps } from 'next';
import StandingsTable, { StandingsTableProps } from '../../components/StandingsTable';
import Header from '../../components/Header';
import MatchData from '../../types/MatchData';
import PlayerData from '../../types/PlayerData';
import PlayerStanding, { StandingValues } from '../../types/PlayerStanding';
import { useRouter } from 'next/router';
import convertAirtableDataToPlayerData from '../../types/convertAirtableDataToPlayerData';
import getBase, { getBaseName, getRevalidateTimer } from '../../data/airtable/getBase';
export interface StandingsProps {
    standings: PlayerData[];
}

export default function Standings(props: StandingsProps) {
    const router = useRouter();
    return (
        <div className=" bg-tile-background bg-repeat min-h-screen">
            {!router.query.hideHeader && (
                <Header title="Super Mario Sunshine Bingo League - Standings" />
            )}
            <main className="text-white flex flex-row flex-wrap w-1/2 m-auto">
                <StandingsTable standings={props.standings} />
            </main>
        </div>
    );
}

function computeStandings(divMapEntry: DivisionMap): PlayerStanding[] {
    let resultMap = new Map<string, StandingValues>();
    seedResultMap(resultMap, divMapEntry.players);
    divMapEntry.matches.forEach(match => {
        updateMapWithMatchPlayer(resultMap, match.homePlayer, match.homePlayer == match.winner);
        updateMapWithMatchPlayer(resultMap, match.awayPlayer, match.awayPlayer == match.winner);
    });
    const standingArray: PlayerStanding[] = [];
    Array.from(resultMap.keys()).forEach(key => {
        standingArray.push({
            player: divMapEntry.players.has(key) ? divMapEntry.players.get(key) : key,
            ...resultMap.get(key),
        });
    });
    standingArray.sort((a, b) => {
        const aName = typeof a.player === 'string' ? a.player : a.player.name;
        const bName = typeof b.player === 'string' ? b.player : b.player.name;
        return b.wins - a.wins != 0
            ? b.wins - a.wins
            : a.totalGames - a.wins - (b.totalGames - b.wins) != 0
            ? a.totalGames - a.wins - (b.totalGames - b.wins)
            : b.totalGames - a.totalGames != 0
            ? b.totalGames - a.totalGames
            : aName > bName
            ? 1
            : -1;
    });
    return standingArray;
}

function seedResultMap(map: Map<string, StandingValues>, players: Map<string, PlayerData>) {
    Array.from(players.keys()).forEach(key => {
        map.set(key, { wins: 0, totalGames: 0 });
    });
}

function updateMapWithMatchPlayer(
    resultMap: Map<string, StandingValues>,
    player: string,
    isWinner: boolean
) {
    if (resultMap.has(player)) {
        resultMap.get(player).wins += isWinner ? 1 : 0;
        resultMap.get(player).totalGames += 1;
    } else {
        resultMap.set(player, { wins: isWinner ? 1 : 0, totalGames: 1 });
    }
}

type DivisionMap = { matches: MatchData[]; players: Map<string, PlayerData> };

function splitIntoDivisions(matches: MatchData[], players: Map<string, PlayerData>) {
    let resultMap = new Map<string, DivisionMap>();
    matches.forEach(match => {
        if (resultMap.has(match.division)) {
            resultMap.get(match.division).matches.push(match);
        } else {
            resultMap.set(match.division, {
                matches: [match],
                players: new Map<string, PlayerData>(),
            });
        }
    });
    Array.from(players.values()).forEach(player => {
        if (resultMap.has(player.division)) {
            resultMap.get(player.division).players.set(player.name, player);
        } else {
            const newMap = new Map<string, PlayerData>();
            newMap.set(player.name, player);
            resultMap.set(player.division, { matches: [], players: newMap });
        }
    });
    return resultMap;
}

export const getStaticProps: GetStaticProps = async context => {
    const sortedPlayers: PlayerData[] = [];
    const base = getBase();
    await base(getBaseName('players'))
        .select({
            sort: [{ field: 'Elo', direction: 'desc' }],
        })
        .eachPage((records, fetchNextPage) => {
            records.forEach(record => {
                sortedPlayers.push(convertAirtableDataToPlayerData(record));
            });
            try {
                fetchNextPage();
            } catch {
                return;
            }
        });
    return {
        props: {
            standings: sortedPlayers,
        },
        revalidate: getRevalidateTimer(),
    };
};
