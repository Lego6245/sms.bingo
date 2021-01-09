import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
    const startHere = [
        'Delay Clicks Live Here',
        'Win Conditions Live Here',
        'Sirena 1 Hundreds Lives Here',
        'Sunshine Fans Live Here',
        'Bingo Enthusiasts Live Here',
        'Counting to 12 Lives Here',
        'Sunshine Bingo Lives Here',
    ];
    const startHereIndex = Math.floor(Math.random() * startHere.length);
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
                    <header>
                        <h1 className="text-5xl font-bold text-white">
                            Super Mario Sunshine 1v1 Lockout Bingo League
                        </h1>
                        <h2 className="text-4xl font-bold text-white my-5 subheadAnimation">
                            {startHere[startHereIndex]}
                        </h2>
                    </header>
                    <div className="flex flex-row justify-center">
                        <Link href="/schedule">
                            <div className="cursor-pointer transition-colors bg-yellow-300 hover:bg-yellow-500 rounded-md text-black font-bold m-2 p-2 text-2xl w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
                                Schedule
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
                </main>
            </div>
        </div>
    );
}
