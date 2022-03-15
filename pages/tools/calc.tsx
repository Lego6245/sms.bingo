import { GetStaticProps } from 'next';
import Header from '../../components/Header';
import PlayerData from '../../types/PlayerData';
import { useRouter } from 'next/router';
import convertAirtableDataToPlayerData from '../../types/convertAirtableDataToPlayerData';
import React from 'react';
import getBase, { getBaseName } from '../../data/airtable/getBase';
export interface StandingsProps {
    players: PlayerData[];
}

export default function PointsCalc(props: StandingsProps) {
    const router = useRouter();
    const [homePlayer, setHomePlayer] = React.useState('none');
    const onHomePlayerChange = React.useCallback((cb: React.ChangeEvent<HTMLSelectElement>) => {
        setHomePlayer(cb.currentTarget.value);
    }, []);
    const [awayPlayer, setAwayPlayer] = React.useState('none');
    const onAwayPlayerChange = React.useCallback((cb: React.ChangeEvent<HTMLSelectElement>) => {
        setAwayPlayer(cb.currentTarget.value);
    }, []);
    let statsComponent;
    if (homePlayer != 'none' && awayPlayer != 'none') {
        const homeData = props.players.find(playerData => playerData.name == homePlayer);
        const awayData = props.players.find(playerData => playerData.name == awayPlayer);
        const homePointsEarned = getPointsEarned(homeData, awayData);
        const awayPointsEarned = getPointsEarned(awayData, homeData);
        statsComponent = (
            <>
                <div>
                    <div>{homeData.name}</div>
                    <div>{'Win: +' + homePointsEarned.win}</div>
                    <div>{'Lose: ' + homePointsEarned.loss}</div>
                </div>
                <div>
                    <div>{awayData.name}</div>
                    <div>{'Win: +' + awayPointsEarned.win}</div>
                    <div>{'Lose: ' + awayPointsEarned.loss}</div>
                </div>
            </>
        );
    } else {
        statsComponent = undefined;
    }
    return (
        <div className=" bg-tile-background bg-repeat min-h-screen">
            {!router.query.hideHeader && (
                <Header title="Super Mario Sunshine Bingo League - Standings" />
            )}
            <main className="text-white flex flex-row flex-wrap w-1/2 m-auto">
                <div className="mx-auto">
                    <select
                        className="text-black"
                        name="homePlayer"
                        id="homePlayer-select"
                        value={homePlayer}
                        onChange={onHomePlayerChange}>
                        <option key={'none'} value={'none'}></option>
                        {props.players.map(playerData => {
                            return (
                                <option key={playerData.name} value={playerData.name}>
                                    {`${playerData.name} (${playerData.elo})`}
                                </option>
                            );
                        })}
                    </select>
                    <select
                        className="text-black"
                        name="awayPlayer"
                        id="awayPlayer-select"
                        value={awayPlayer}
                        onChange={onAwayPlayerChange}>
                        <option key={'none'} value={'none'}></option>
                        {props.players.map(playerData => {
                            return (
                                <option key={playerData.name} value={playerData.name}>
                                    {`${playerData.name} (${playerData.elo})`}
                                </option>
                            );
                        })}
                    </select>
                </div>
                {!!statsComponent && <div className="mx-auto">{statsComponent}</div>}
            </main>
        </div>
    );
}

function calcExpectedScore(you: PlayerData, them: PlayerData) {
    return 1 / (1 + 10 ** ((them.elo - you.elo) / 750));
}

function getPointsEarned(
    you: PlayerData,
    them: PlayerData
): {
    win: number;
    loss: number;
} {
    return {
        win: Math.round(100 * (1 - calcExpectedScore(you, them))),
        loss: Math.round(100 * (0 - calcExpectedScore(you, them))),
    };
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
            players: sortedPlayers,
        },
        revalidate: 600,
    };
};
