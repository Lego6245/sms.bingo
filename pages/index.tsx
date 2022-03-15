import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Home() {
    const startHere = [
        ['Delay Clicks', ' Start Here'],
        ['Win Conditions', ' Start Here'],
        ['Sirena 1 Hundreds', ' Starts Here'],
        ['Sunshine Fans', ' Start Here'],
        ['Bingo Enthusiasts', ' Start Here'],
        ['Counting to 12', ' Starts Here'],
        ['Sunshine Bingo', ' Starts Here'],
        ['Sirena Whenever', ' Starts Here'],
        ['Life Grinding', ' Starts Here'],
        ['Wiggler ILs', ' Start Here'],
        ['Ricco 3 Hoverless', ' Starts Here'],
        ['Fifty from Two', ' Starts Here'],
        ['Seven Shines in Secrets', ' Starts Here'],
        ['Yellow Button Coins', ' Start Here'],
        ['Lighthouse Rush', ' Starts Here'],
        ['Fire Piantas', ' Start Here'],
        ['King Boo Lockout', ' Starts Here'],
        ['River Gang', ' Starts Here'],
        ['Hidden Reds Hoverless', ' Starts Here'],
    ];
    const [startHereIndex, setStartHereIndex] = React.useState(
        Math.floor(Math.random() * startHere.length)
    );

    const randomizeStartHere = React.useCallback(() => {
        setStartHereIndex(Math.floor(Math.random() * startHere.length));
    }, []);
    return (
        <div>
            <Head>
                <title>Season 3 Historical Data</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="fixed min-h-full min-w-full bg-tile-background bg-repeat">
                <div className="fixed min-h-full min-w-full bg-black opacity-60" />
            </div>
            <div className="fixed min-h-screen min-w-full">
                <main className={'min-h-screen flex flex-col justify-center text-center z-20'}>
                    <div>
                        <div className="h-auto text-5xl font-bold text-white">
                            Season 3 Historical Data
                        </div>
                        <div
                            onClick={randomizeStartHere}
                            className="flex flex-row justify-center text-4xl font-bold text-white my-5 subheadAnimation">
                            <div className="text-yellow-300 text-right w-1/2 mr-2">
                                {startHere[startHereIndex][0]}
                            </div>
                            <div className="text-blue-400 text-left w-1/2 ml-2">
                                {startHere[startHereIndex][1]}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center">
                        <Link href="/schedule">
                            <div className="cursor-pointer transition-colors bg-yellow-300 hover:bg-yellow-500 rounded-md text-black font-bold m-2 p-2 text-2xl w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
                                Historical Matches
                            </div>
                        </Link>
                        <Link href="/standings">
                            <div className="cursor-pointer transition-colors bg-yellow-300 hover:bg-yellow-500 rounded-md text-black font-bold m-2 p-2 text-2xl w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
                                Final Standings
                            </div>
                        </Link>
                        {/* <Link href="https://docs.google.com/spreadsheets/d/1gN6xyfIoaDTwf04Oz_Yvf5AKNwhfTPi4pA0Bx4_ebMk/edit#gid=0">
                            <div className="cursor-pointer transition-colors bg-yellow-300 hover:bg-yellow-500 rounded-md text-black font-bold m-2 p-2 text-2xl w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
                                Playoff Bracket
                            </div>
                        </Link> */}
                    </div>
                    <div className="flex flex-row justify-center">
                        <a
                            className="transition-colors bg-yellow-300 hover:bg-yellow-500 rounded-md text-black font-bold m-2 p-2 text-2xl w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
                            href="https://discord.gg/MVnV2qb">
                            Join the Discord
                        </a>
                    </div>
                </main>
            </div>
        </div>
    );
}
