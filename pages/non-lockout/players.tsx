// import { GetStaticProps } from 'next';
// import StandingsTable, { StandingsTableProps } from '../../components/StandingsTable';
// import Header from '../../components/Header';
// import MatchData from '../../types/MatchData';
// import PlayerData from '../../types/PlayerData';
// import PlayerStanding, { StandingValues } from '../../types/PlayerStanding';
// import { useRouter } from 'next/router';
// import convertAirtableDataToPlayerData from '../../types/convertAirtableDataToPlayerData';
// import getBase, { getBaseName, getRevalidateTimer } from '../../data/airtable/getBase';
// export interface StandingsProps {
//     standings: PlayerData[];
// }

// export default function Standings(props: StandingsProps) {
//     const router = useRouter();
//     return (
//         <div className=" bg-tile-background bg-repeat min-h-screen">
//             {!router.query.hideHeader && (
//                 <Header title="SMS Non Lockout Tournament - Players List" />
//             )}
//             <main className="text-white flex flex-row flex-wrap w-1/2 m-auto">
//                 <StandingsTable standings={props.standings} />
//             </main>
//         </div>
//     );
// }

// export const getStaticProps: GetStaticProps = async context => {
//     const sortedPlayers: PlayerData[] = [];
//     const base = getBase();
//     await base(getBaseName('non-lockout players'))
//         .select({
//             sort: [{ field: 'Name', direction: 'desc' }],
//         })
//         .eachPage((records, fetchNextPage) => {
//             records.forEach(record => {
//                 sortedPlayers.push(convertAirtableDataToPlayerData(record));
//             });
//             try {
//                 fetchNextPage();
//             } catch {
//                 return;
//             }
//         });
//     return {
//         props: {
//             standings: sortedPlayers,
//         },
//         revalidate: getRevalidateTimer(),
//     };
// };
