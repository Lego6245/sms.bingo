import * as React from 'react';
import Square from './Square';
import { GoalEvent } from '../types/FeedEvent';
import { SquareData } from '../types/SquareData';
import { bingosyncColorsToTailwindColors, BingosyncColorStrings } from '../types/BingosyncColors';

interface BoardProps {
    boardJson: SquareData[];
    goalFeed: GoalEvent[];
}

export default function Board(props: BoardProps) {
    const { boardJson, goalFeed } = props;

    // While data is implied to come down in order, it's not guaranteed. Sort.
    boardJson.sort((first, second) => slotToNumber(first.slot) - slotToNumber(second.slot));

    const [spoilers, setSpoilers] = React.useState(false);

    const [matchSlice, setMatchSlice] = React.useState(goalFeed.length);

    // const toggleSpoilers = React.useCallback(() => {
    //     setSpoilers(!spoilers);
    // }, [spoilers]);

    const onSliderChange = React.useCallback(event => {
        setMatchSlice(event.target.value);
    }, []);

    let transformedBoard;
    // if (spoilers) {
    const slicedClickList = goalFeed.slice(0, matchSlice);
    transformedBoard = transformBoardFromClicks(boardJson, slicedClickList);
    // } else {
    //     transformedBoard = transformBoardFromClicks(boardJson, []);
    // }
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
                    />
                ))}
            </div>
            {/* {!!spoilers && <span>spilers</span>}
            <button onClick={toggleSpoilers}>splers</button> */}
            <input
                type={'range'}
                className={'w-full'}
                min={0}
                max={goalFeed.length}
                value={matchSlice}
                onChange={onSliderChange}
            />
        </>
    );
}

function transformBoardFromClicks(boardJson: SquareData[], goalFeed: GoalEvent[]) {
    const newBoard = boardJson.map(square => {
        square.colors = 'blank';
        return square;
    });
    goalFeed.forEach(event => {
        const index = slotToNumber(event.square.slot) - 1;
        newBoard[index] = event.square;
    });
    return newBoard;
}

function slotToNumber(slotString: string): number {
    return parseInt(slotString.slice(4));
}
