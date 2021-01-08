import { GetStaticProps } from "next";
import StandingsTable from "../../components/StandingsTable";
import Header from '../../components/Header';
import importCsvForBuild from "../../scripts/importCsvForBuild";

export interface StandingsProps {
    standings: any[]
}


export default function Standings(props: StandingsProps) {
    return (
        <div className=" bg-tile-background bg-repeat min-h-screen">
            <Header title="Super Mario Sunshine Bingo League - Standings" />
            <main className="text-white flex flex-row">
                {props.standings.length > 0 && props.standings.map(divisionStandings => {
                    return (
                    <div className="w-1/5 mx-auto">
                        <StandingsTable {...divisionStandings} />
                    </div>)
                })}
            </main>
        </div>
    );
}

type StandingValues = { wins: number, totalGames: number };

function computeStandings(divMapEntry: DivisionMap): any[] {
    let resultMap = new Map<string, StandingValues>();
    seedResultMap(resultMap, divMapEntry.players);
    divMapEntry.matches.forEach(match => {
        updateMapWithMatchPlayer(resultMap, match.homePlayer, match.homePlayer == match.winner);
        updateMapWithMatchPlayer(resultMap, match.awayPlayer, match.awayPlayer == match.winner);
    });
    const standingArray: any[] = [];
    Array.from(resultMap.keys()).forEach(key => {
        standingArray.push({
            player: divMapEntry.players.has(key) ? divMapEntry.players.get(key) : key,
            ...resultMap.get(key)
        })
    });
    standingArray.sort((a, b) => b.wins - a.wins != 0 ? b.wins - a.wins :  (a.player.name > b.player.name ? 1 : -1));
    return standingArray;
}

function seedResultMap(map: Map<string, StandingValues>, players: Map<string, any>) {
    Array.from(players.keys()).forEach(key => {
        map.set(key, { wins: 0, totalGames: 0})
    })
}

function updateMapWithMatchPlayer(resultMap: Map<string, StandingValues>, player: string, isWinner: boolean) {
    if (resultMap.has(player)) {
        resultMap.get(player).wins += isWinner ? 1 : 0;
        resultMap.get(player).totalGames += 1;
    } else {
        resultMap.set(player, { wins: isWinner ? 1 : 0, totalGames: 1});
    }
}

type DivisionMap = { matches: any[], players: Map<string, any>};

function splitIntoDivisions(matches: any[], players: Map<string, any>) {
    let resultMap = new Map<string, DivisionMap>();
    matches.forEach(match => {
        if (resultMap.has(match.division)) {
            resultMap.get(match.division).matches.push(match);
        } else {
            resultMap.set(match.division, { matches: [match], players: new Map<string, any>() });
        }
    });
    Array.from(players.values()).forEach(player => {
        if (resultMap.has(player.division)) {
            resultMap.get(player.division).players.set(player.name, player);
        } else {
            const newMap = new Map<string, any>();
            newMap.set(player.name, player);
            resultMap.set(player.division, { matches: [], players: newMap });
        }
    })
    return resultMap;
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { matches, players } = await importCsvForBuild();
    const filteredMatches = matches.filter(match => match.status == "played");
    const divisionMapping = splitIntoDivisions(filteredMatches, players);
    const standingsArray = [];
    Array.from(divisionMapping.keys()).forEach(key => {
        standingsArray.push({
            division: key,
            standings: computeStandings(divisionMapping.get(key))
        });
    });
    standingsArray.sort((a, b) => a.division > b.division ? 1 : -1);
    return {
        props: {
            standings: standingsArray
        }
    }
}