import { GetStaticProps } from 'next';
import Header from '../../components/Header';
import ScheduleTable from '../../components/ScheduleTable';
import importCsvForBuild from '../../scripts/importCsvForBuild';
import React from 'react';
import { useRouter } from 'next/router';
import MatchData from '../../types/MatchData';
import ScheduleSlots from '../../consts/ScheduleSlots';
import 'tippy.js/dist/tippy.css';

export interface ScheduleProps {
    matches: MatchData[];
    divisions: string[];
}

const calendarWeeks = ['1', '2', '3', '4', '5', '6', '7', '8'];

export default function Schedule(props: ScheduleProps) {
    const router = useRouter();
    const [showScheduledOnly, setShowScheduledOnly] = React.useState(!!router.query.scheduled);
    const [divisionToShow, setDivisionToShow] = React.useState('all');
    const [forceSpoilers, setForceSpoilers] = React.useState(false);
    const [selectedWeek, setSelectedWeek] = React.useState('none');
    const [searchQuery, setSearchQuery] = React.useState('');

    const onSearchQueryChange = React.useCallback((cb: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(cb.currentTarget.value);
    }, []);

    const onWeekSelectChange = React.useCallback((cb: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedWeek(cb.currentTarget.value);
    }, []);

    const onShowScheduleClick = React.useCallback((cb: React.MouseEvent<HTMLInputElement>) => {
        setShowScheduledOnly(cb.currentTarget.checked);
    }, []);

    const onForceSpoilersClicked = React.useCallback((cb: React.MouseEvent<HTMLInputElement>) => {
        setForceSpoilers(cb.currentTarget.checked);
    }, []);

    const onSelectChange = React.useCallback((cb: React.ChangeEvent<HTMLSelectElement>) => {
        setDivisionToShow(cb.currentTarget.value);
    }, []);
    const matchMap = new Map<number | string, MatchData[]>();
    if (selectedWeek == 'none') {
        const filteredMatches = applyFilters(
            props.matches,
            divisionToShow,
            showScheduledOnly,
            searchQuery
        );
        filteredMatches.forEach(match => {
            if (matchMap.has(match.week)) {
                matchMap.get(match.week).push(match);
            } else {
                matchMap.set(match.week, [match]);
            }
        });

        Array.from(matchMap.keys()).forEach(key => {
            matchMap.get(key).sort((a, b) => {
                return !!a.matchTime ? (!!b.matchTime ? a.matchTime - b.matchTime : -1) : 1;
            });
        });
    } else {
        const dateFactor = (parseInt(selectedWeek) - 1) * 604800; // Constant of 1 week.
        const firstTimestamp = ScheduleSlots.get('1')[0] + dateFactor;
        const lastTimestamp =
            ScheduleSlots.get('5')[ScheduleSlots.get('5').length - 1] + dateFactor;
        let onlyScheduled = props.matches.filter(
            match =>
                match.status != 'unscheduled' &&
                match.matchTime >= firstTimestamp &&
                match.matchTime <= lastTimestamp &&
                match.channel != 'Offline'
        );
        Array.from(ScheduleSlots.keys()).forEach(key => {
            const slots = ScheduleSlots.get(key);
            slots.forEach(slot => {
                const foundMatch = onlyScheduled.filter(match => match.matchTime == slot);
                const slotData: MatchData[] =
                    foundMatch.length > 0
                        ? foundMatch
                        : [
                              {
                                  homePlayer: 'TBD',
                                  awayPlayer: 'TBD',
                                  week: parseInt(key) ?? -1,
                                  division: 'TBD',
                                  status: 'unscheduled',
                                  matchTime: slot,
                                  format: 'TBD',
                              },
                          ];
                if (matchMap.has(key)) {
                    matchMap.get(key).push(...slotData);
                } else {
                    matchMap.set(key, slotData);
                }
            });
            const filteredMatchSet = applyFilters(
                matchMap.get(key),
                divisionToShow,
                showScheduledOnly,
                searchQuery
            );
            matchMap.set(key, filteredMatchSet);
        });
    }
    // Yes this is messy sue me.
    const sortedWeeks = Array.from(matchMap.keys()).sort(
        (a, b) => parseInt(a as string) - parseInt(b as string)
    );
    return (
        <div className="bg-tile-background bg-repeat min-h-screen overflow-x-auto">
            <Header title="Super Mario Sunshine Bingo league - Schedule" />
            <main className="text-white flex flex-col">
                <div className="flex flex-row items-baseline text-sm">
                    <div className="mx-5">
                        <input
                            type="checkbox"
                            defaultChecked={showScheduledOnly}
                            id="fullSchedule"
                            onClick={onShowScheduleClick}
                        />
                        <label className="ml-5 text-sm sm:text-lg" htmlFor="fullSchedule">
                            Show Scheduled Matches Only
                        </label>
                    </div>
                    <div className="mx-5">
                        <select
                            className="text-black"
                            name="divisions"
                            id="division-select"
                            onChange={onSelectChange}>
                            <option value="all">All</option>
                            {props.divisions &&
                                props.divisions.length > 0 &&
                                props.divisions.map(division => {
                                    return (
                                        <option key={division} value={division}>
                                            {division}
                                        </option>
                                    );
                                })}
                        </select>
                        <label className="ml-5 text-sm sm:text-lg" htmlFor="division-select">
                            Division Filter
                        </label>
                    </div>
                    <div className="mx-5">
                        <input
                            type="checkbox"
                            id="forceSpoilers"
                            onClick={onForceSpoilersClicked}
                        />
                        <label className="ml-5 text-sm sm:text-lg" htmlFor="forceSpoilers">
                            Force Spoilers to Show
                        </label>
                    </div>
                    <div className="mx-5">
                        <select
                            className="text-black"
                            name="weeks"
                            id="week-select"
                            onChange={onWeekSelectChange}>
                            <option value="none">Disable</option>
                            {calendarWeeks.map(week => {
                                return (
                                    <option key={week} value={week}>
                                        {week}
                                    </option>
                                );
                            })}
                        </select>
                        <label className="ml-5 text-sm sm:text-lg" htmlFor="week-select">
                            Show Calendar Weeks
                        </label>
                    </div>
                    <div className="mx-5">
                        <input
                            className="text-black"
                            name="search"
                            id="search-input"
                            value={searchQuery}
                            placeholder={'Type a player name'}
                            onChange={onSearchQueryChange}
                        />
                        <label className="ml-5 text-sm sm:text-lg" htmlFor="search-input">
                            Player Search
                        </label>
                    </div>
                </div>
                <div className="mx-auto">
                    All times shown are in the following time zone:{' '}
                    {Intl.DateTimeFormat().resolvedOptions().timeZone}. Hover over times for League
                    Time (EST)
                </div>
                <div className="sm:w-10/12 sm:mx-auto">
                    {sortedWeeks.map(key => (
                        <div key={getTableTitleByWeek(key)} className="mt-5">
                            <ScheduleTable
                                forceSpoilers={forceSpoilers}
                                matches={matchMap.get(key)}
                                tableTitle={getTableTitleByWeek(key)}
                                hideHomeAway={key === 5}
                            />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

function applyFilters(
    matches: MatchData[],
    divisionToShow: string,
    showScheduledOnly: boolean,
    searchQuery: string
): MatchData[] {
    let filteredMatches = matches;
    switch (divisionToShow) {
        case 'all':
            break;
        default:
            filteredMatches = filteredMatches.filter(match => match.division == divisionToShow);
    }

    if (showScheduledOnly) {
        filteredMatches = filteredMatches.filter(match => match.status == 'scheduled');
    }

    const normalizedSearchQuery = searchQuery.trim().toLowerCase();
    if (!!normalizedSearchQuery) {
        filteredMatches = filteredMatches.filter(
            match =>
                match.homePlayer.toLowerCase().indexOf(normalizedSearchQuery) > -1 ||
                match.awayPlayer.toLowerCase().indexOf(normalizedSearchQuery) > -1
        );
    }

    return filteredMatches;
}

function getTableTitleByWeek(key: number | string) {
    if (typeof key === 'string') {
        return 'Day ' + key;
    }
    switch (key) {
        case 0:
            return 'Upcoming Matches';
        case 5:
            return 'Week 5: Neutral Week';
        case 9:
            return 'Week 1-3 Extra Match';
        case 10:
            return 'Week 4-5 Extra Match';
        case 11:
            return 'Week 6-8 Extra Match';
        default:
            return 'Week ' + key;
    }
}

export const getStaticProps: GetStaticProps = async context => {
    const matches = (await importCsvForBuild()).matches;
    const divisions = [];
    matches.forEach(match => {
        if (divisions.indexOf(match.division) == -1) {
            divisions.push(match.division);
        }
    });
    return {
        props: {
            matches,
            divisions,
        },
    };
};
