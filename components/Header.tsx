import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Header(props: { title: string }) {
    const router = useRouter();
    const hrefs = [
        {
            route: '/upcoming',
            label: 'Schedule',
        },
        {
            route: '/standings',
            label: 'Standings',
        },
        {
            route: '/schedule',
            label: 'Match History',
        },
        {
            route: '/resources',
            label: 'Resources',
        },
    ];
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
                            <Image
                                alt="Picture of a shine sprite from Super Mario Sunshine. Click here to return to the homepage."
                                src="/shine.png"
                                height={50}
                                width={50}
                            />
                        </Link>
                    </div>
                    {hrefs.map(href => (
                        <div
                            key={href.label}
                            className={
                                'mr-10' + (router.pathname == href.route ? ' font-bold' : '')
                            }>
                            <Link href={href.route}>{href.label}</Link>
                        </div>
                    ))}
                </div>
            </header>
        </>
    );
}
