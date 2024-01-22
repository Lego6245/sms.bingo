import { GetStaticProps } from 'next';
import StandingsTable, { StandingsTableProps } from '../../components/StandingsTable';
import Header from '../../components/Header';
import MatchData from '../../types/MatchData';
import PlayerData from '../../types/PlayerData';
import PlayerStanding, { StandingValues } from '../../types/PlayerStanding';
import { useRouter } from 'next/router';
import convertAirtableDataToPlayerData from '../../types/convertAirtableDataToPlayerData';
import getBase, { getBaseName, getRevalidateTimer } from '../../data/airtable/getBase';
import React from 'react';
import convertAirtableDataToMatchData from '../../types/convertAirtableDataToMatchData';
export interface StandingsProps {
    playerStandings: PlayerData[];
    divisionStandings: {
        division: string;
        standings: PlayerStanding[];
    }[];
}

export default function Standings(props: StandingsProps) {
    const router = useRouter();
    const [showDivisions, setShowDivisions] = React.useState(true);
    const onDivisionClicked = React.useCallback((cb: React.MouseEvent<HTMLInputElement>) => {
        setShowDivisions(cb.currentTarget.checked);
    }, []);
    return (
        <div className=" bg-tile-background bg-repeat min-h-screen">
            {!router.query.hideHeader && (
                <Header title="Super Mario Sunshine Bingo League - Standings" />
            )}
            <div className="mx-5 text-white">
                <input
                    type="checkbox"
                    defaultChecked={showDivisions}
                    id="elos"
                    onClick={onDivisionClicked}
                />
                <label className="ml-5 text-sm sm:text-lg" htmlFor="elos">
                    Show Pod Results
                </label>
            </div>
            <main
                className={
                    showDivisions
                        ? 'text-white flex flex-row flex-wrap justify-around w-full m-auto'
                        : 'text-white flex flex-row flex-wrap w-1/2 m-auto'
                }>
                {!!showDivisions ? (
                    props.divisionStandings.length > 0 &&
                    props.divisionStandings.map(divisionStandings => {
                        return (
                            <div className="min-w-max w-1/6 m-8" key={divisionStandings.division}>
                                <StandingsTable
                                    key={divisionStandings.division}
                                    standings={divisionStandings.standings}
                                    tableHeader={'Pod ' + divisionStandings.division}
                                    computeSubHeader={player => {
                                        const pData = player as PlayerStanding; // this is naughty but whatever
                                        return pData.wins + ' - ' + (pData.totalGames - pData.wins);
                                    }}
                                />
                            </div>
                        );
                    })
                ) : (
                    <StandingsTable standings={props.playerStandings} />
                )}
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
    divMapEntry.players.forEach(player => {
        standingArray.push({
            ...player,
            ...resultMap.get(player.name),
        });
    });
    standingArray.sort((a, b) => {
        return b.wins - a.wins != 0
            ? b.wins - a.wins
            : a.totalGames - a.wins - (b.totalGames - b.wins) != 0
            ? a.totalGames - a.wins - (b.totalGames - b.wins)
            : b.totalGames - a.totalGames != 0
            ? b.totalGames - a.totalGames
            : a.name > b.name
            ? 1
            : -1;
    });
    return standingArray;
}

function seedResultMap(map: Map<string, StandingValues>, players: PlayerData[]) {
    players.forEach(player => {
        map.set(player.name, { wins: 0, totalGames: 0 });
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

type DivisionMap = { matches: MatchData[]; players: PlayerData[] };

function splitIntoDivisions(matches: MatchData[], players: PlayerData[]) {
    let resultMap = new Map<string, DivisionMap>();
    matches.forEach(match => {
        if (!!match.division) {
            if (resultMap.has(match.division)) {
                resultMap.get(match.division).matches.push(match);
            } else {
                resultMap.set(match.division, {
                    matches: [match],
                    players: [],
                });
            }
        }
    });
    Array.from(players).forEach(player => {
        if (!!player.division) {
            if (resultMap.has(player.division)) {
                resultMap.get(player.division).players.push(player);
            } else {
                resultMap.set(player.division, { matches: [], players: [player] });
            }
        }
    });
    return resultMap;
}

export const getStaticProps: GetStaticProps = async context => {
    const sortedPlayers: PlayerData[] = [];
    const matches: MatchData[] = [];
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
    await base(getBaseName('matches'))
        .select({
            filterByFormula: `{Status} = "Played"`,
        })
        .eachPage((records, fetchNextPage) => {
            records.forEach(record => {
                matches.push(convertAirtableDataToMatchData(record));
            });
            try {
                fetchNextPage();
            } catch {
                return;
            }
        });
    const filteredMatches = matches.filter(
        match =>
            match.week.toLowerCase().indexOf('playoff') == -1 &&
            match.week.toLowerCase().indexOf('showcase') == -1
    );
    const divisionMapping = splitIntoDivisions(filteredMatches, sortedPlayers);
    const standingsArray = [];
    if (Array.from(divisionMapping.keys()).length > 0) {
        Array.from(divisionMapping.keys()).forEach(key => {
            standingsArray.push({
                division: key,
                standings: computeStandings(divisionMapping.get(key)),
            });
        });
    }
    standingsArray.sort((a, b) => (a.division > b.division ? 1 : -1));
    return {
        props: {
            playerStandings: sortedPlayers,
            divisionStandings: standingsArray,
        },
        revalidate: getRevalidateTimer(),
    };
};
