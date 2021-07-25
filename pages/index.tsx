import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import NextMatchOverlay from '../components/NextMatchOverlay';
import MatchData from '../types/MatchData';
import Airtable from 'airtable';
import convertAirtableDataToMatchData from '../types/convertAirtableDataToMatchData';

export interface HomeProps {
    upcomingMatches: MatchData[];
}

export default function Home(props: HomeProps) {
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
    const { upcomingMatches } = props;
    let k = 0;
    let selectedMatch: MatchData;
    if (upcomingMatches?.length > 0) {
        while (!selectedMatch && k < upcomingMatches.length) {
            if ((upcomingMatches[k].matchTime + 60 * 60) * 1000 - Date.now() > 0) {
                selectedMatch = upcomingMatches[k];
            } else {
                k++;
            }
        }
    }
    return (
        <div>
            <Head>
                <title>Super Mario Sunshine Bingo League</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="fixed min-h-full min-w-full bg-tile-background bg-repeat">
                <video
                    className="fixed min-h-full min-w-full object-cover"
                    autoPlay
                    muted
                    loop
                    id="bgvideo"
                    poster="/bingo-poster.png">
                    <source src="/background.mp4" type="video/mp4" />
                </video>
                <div className="fixed min-h-full min-w-full bg-black opacity-60" />
            </div>
            <div className="fixed min-h-screen min-w-full">
                <main className={'min-h-screen flex flex-col justify-center text-center z-20'}>
                    <div>
                        <div className="h-auto text-5xl font-bold text-white">
                            Super Mario Sunshine 1v1 Lockout Bingo League
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
                        <Link href="/upcoming">
                            <div className="cursor-pointer transition-colors bg-yellow-300 hover:bg-yellow-500 rounded-md text-black font-bold m-2 p-2 text-2xl w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
                                Upcoming Matches
                            </div>
                        </Link>
                        <Link href="/standings">
                            <div className="cursor-pointer transition-colors bg-yellow-300 hover:bg-yellow-500 rounded-md text-black font-bold m-2 p-2 text-2xl w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
                                Standings
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-row justify-center">
                        <a
                            className="transition-colors bg-yellow-300 hover:bg-yellow-500 rounded-md text-black font-bold m-2 p-2 text-2xl w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
                            href="https://discord.gg/MVnV2qb">
                            Join the Discord
                        </a>
                    </div>
                    {selectedMatch && (
                        <div className="bg-tile-background bg-repeat fixed bottom-0 py-2 h-24 left-0 w-full">
                            <NextMatchOverlay match={selectedMatch} />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async context => {
    const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
    const matches: MatchData[] = [];
    await base('Season 3 Matches')
        .select({
            filterByFormula:
                'AND(DATETIME_DIFF({Match Time (UTC)}, NOW(),"hours") <= 24, OR({Restream Channel} = "Bingothon", {Restream Channel} = "SunshineCommunity"))',
            sort: [{ field: 'Match Time (UTC)' }],
        })
        .eachPage((records, fetchNextPage) => {
            try {
                records.forEach(record => {
                    matches.push(convertAirtableDataToMatchData(record));
                });
                fetchNextPage();
            } catch (e) {
                return;
            }
        });
    return {
        props: {
            upcomingMatches: matches,
        },
        revalidate: 60,
    };
};
