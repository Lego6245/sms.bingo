import * as React from 'react';
import Square from './Square';
import { GoalEvent } from '../types/FeedEvent';
import { SquareData } from '../types/SquareData';
import { bingosyncColorsToTailwindColors, BingosyncColorStrings } from '../types/BingosyncColors';

type ExtendedSquareData = SquareData & { draftedColor?: string; draftedNumber?: number };
interface BoardProps {
    boardJson: ExtendedSquareData[];
    goalFeed: GoalEvent[];
    startTimestamp: number;
    matchFormat: string;
}

export default function Board(props: BoardProps) {
    const { boardJson, goalFeed, startTimestamp, matchFormat } = props;

    // While data is implied to come down in order, it's not guaranteed. Sort.
    boardJson.sort((first, second) => slotToNumber(first.slot) - slotToNumber(second.slot));

    const [showDetails, setShowDetails] = React.useState(false);

    const onShowDetailsClicked = React.useCallback((cb: React.MouseEvent<HTMLInputElement>) => {
        setShowDetails(cb.currentTarget.checked);
    }, []);

    const [matchSlice, setMatchSlice] = React.useState(goalFeed.length);

    const onSliderChange = React.useCallback(event => {
        setMatchSlice(event.target.value);
    }, []);

    const playerColorMap: Map<string, string[]> = React.useMemo(() => {
        const playerColorMap = new Map<string, string[]>();

        goalFeed.forEach(event => {
            if (playerColorMap.has(event.player.name)) {
                if (playerColorMap.get(event.player.name).indexOf(event.color) < 0) {
                    playerColorMap.get(event.player.name).push(event.color);
                }
            } else {
                playerColorMap.set(event.player.name, [event.color]);
            }
        });

        return playerColorMap;
    }, [goalFeed]);
    const priorToStartClicks = React.useMemo(() => {
        return goalFeed.filter(event => event.timestamp < startTimestamp);
    }, [goalFeed, startTimestamp]);
    const postStartClicks = React.useMemo(() => {
        return goalFeed.filter(event => event.timestamp > startTimestamp);
    }, [goalFeed, startTimestamp]);
    const slicedClickList = postStartClicks.slice(0, matchSlice);
    const transformedBoard = transformBoardFromClicks(
        boardJson,
        slicedClickList,
        matchFormat == 'Draft' ? priorToStartClicks : undefined
    );
    const slicedTimestamp =
        slicedClickList.length > 0
            ? Math.round(slicedClickList[slicedClickList.length - 1].timestamp) - startTimestamp
            : undefined;
    return (
        <>
            <div className={'flex flex-wrap h-full w-full'}>
                {transformedBoard.map(square => (
                    <Square
                        goalText={square.name}
                        color={bingosyncColorsToTailwindColors(
                            square.colors as BingosyncColorStrings
                        )}
                        key={square.slot}
                        draftedColor={bingosyncColorsToTailwindColors(
                            square.draftedColor as BingosyncColorStrings
                        )}
                        draftedNumber={square.draftedNumber}
                    />
                ))}
            </div>
            <input
                type={'range'}
                className={'w-full'}
                min={0}
                max={postStartClicks.length}
                value={matchSlice}
                onChange={onSliderChange}
            />
            <div>
                <span>Timestamp: </span>
                <span>
                    {slicedTimestamp
                        ? `${Math.round(slicedTimestamp / 60)}:${(
                              slicedTimestamp % 60
                          ).toLocaleString('en-us', { minimumIntegerDigits: 2 })}`
                        : '0:00'}
                </span>
                <label className="px-3" htmlFor="details">
                    Show Event Details
                </label>
                <input
                    type="checkbox"
                    defaultChecked={showDetails}
                    id="details"
                    onClick={onShowDetailsClicked}
                />
            </div>
            {showDetails && <span>{generateDetailsStringFromLastEvent(slicedClickList)}</span>}
        </>
    );
}

function transformBoardFromClicks(
    boardJson: SquareData[],
    goalFeed: GoalEvent[],
    draftedGoalEvents?: GoalEvent[]
) {
    const newBoard: ExtendedSquareData[] = boardJson.map(square => {
        square.colors = 'blank';
        return square;
    });
    goalFeed.forEach(event => {
        const index = slotToNumber(event.square.slot) - 1;
        newBoard[index] = event.square;
    });
    let count = 1;
    draftedGoalEvents?.forEach(event => {
        const index = slotToNumber(event.square.slot) - 1;
        newBoard[index].draftedColor = event.color;
        newBoard[index].draftedNumber = count;
        count++;
    });
    return newBoard;
}

function slotToNumber(slotString: string): number {
    return parseInt(slotString.slice(4));
}

function generateDetailsStringFromLastEvent(events: GoalEvent[]): string {
    if (events.length > 0) {
        const event = events[events.length - 1];
        return `${event.player.name} ${event.remove ? 'unclicked' : 'clicked'} goal "${
            event.square.name
        }" w/ color ${event.color} @ ${Math.round(event.timestamp)}`;
    } else {
        return 'Start of match';
    }
}
