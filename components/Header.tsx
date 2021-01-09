import Head from 'next/head';
import Link from 'next/link';

export default function Header(props: { title: string }) {
    return (
        <>
            <Head>
                <title>{props.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="text-white text-lg">
                <div className="p-3 flex flex-row items-center">
                    <div className="mr-10">
                        <Link href="/">
                            <img src="/shine.png" height={50} width={50} />
                        </Link>
                    </div>
                    <div className="mr-10">
                        <Link href="/standings">Standings</Link>
                    </div>
                    <div className="mr-10">
                        <Link href="/schedule">Schedule</Link>
                    </div>
                </div>
            </header>
        </>
    );
}
