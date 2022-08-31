// import { GetStaticProps } from 'next';
// import { NonLockoutScheduleTable } from '../../components/ScheduleTable';
// import React from 'react';
// import MatchData, { NonLockoutMatchData } from '../../types/MatchData';
// import Header from '../../components/Header';
// import convertAirtableDataToMatchData from '../../types/convertAirtableDataToMatchData';
// import getBase, { getBaseName, getRevalidateTimer } from '../../data/airtable/getBase';

// export interface ScheduleProps {
//     matches: NonLockoutMatchData[];
// }

// export default function Schedule(props: ScheduleProps) {
//     let matchSet = props.matches;
//     const matchMap = new Map<number | string, NonLockoutMatchData[]>();
//     matchSet.forEach(match => {
//         if (matchMap.has(match.round)) {
//             matchMap.get(match.round).push(match);
//         } else {
//             matchMap.set(match.round, [match]);
//         }
//     });

//     Array.from(matchMap.keys()).forEach(key => {
//         matchMap.get(key).sort((a, b) => {
//             return !!a.matchTime ? (!!b.matchTime ? a.matchTime - b.matchTime : -1) : 1;
//         });
//     });

//     const sortedWeeks = Array.from(matchMap.keys()).sort(
//         (a, b) => parseInt(b as string) - parseInt(a as string)
//     );
//     return (
//         <div className="bg-tile-background bg-repeat min-h-screen overflow-x-auto">
//             <Header title="SMS Non-Lockout Bingo Tournament - Schedule of Matches" />
//             <main className="text-white flex flex-col h-full">
//                 <div className="sm:w-10/12 sm:mx-auto sm:my-auto">
//                     {sortedWeeks.length > 0 ? (
//                         sortedWeeks.map(week => (
//                             <div className="mt-5">
//                                 <NonLockoutScheduleTable
//                                     matches={matchMap.get(week)}
//                                     tableTitle={'Round ' + week}
//                                     key={week}
//                                 />
//                             </div>
//                         ))
//                     ) : (
//                         <div className="text-3xl mx-auto text-center mb-5 font-bold">
//                             No matches currently scheduled, check back later!
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// }

// export const getStaticProps: GetStaticProps = async context => {
//     const base = getBase();
//     const matches: NonLockoutMatchData[] = [];
//     await base(getBaseName('non-lockout matches'))
//         .select({
//             sort: [{ field: 'Match Time (UTC)' }],
//         })
//         .eachPage((records, fetchNextPage) => {
//             records.forEach(record => {
//                 try {
//                     matches.push(convertAirtableDataToMatchData(record, true /* nonLockout */));
//                 } catch (e) {
//                     console.log(e);
//                 }
//             });
//             try {
//                 fetchNextPage();
//             } catch (e) {
//                 return;
//             }
//         });
//     return {
//         props: {
//             matches,
//         },
//         revalidate: getRevalidateTimer(),
//     };
// };
