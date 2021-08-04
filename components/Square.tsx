import * as React from 'react';

interface SquareProps {
    goalText: string;
    color: string;
    draftedColor: string;
    draftedNumber: number;
}

export default function Square(props: SquareProps) {
    let squareColor = getBgColorFromString(props.color);
    let draftColor = getBgColorFromString(props.draftedColor);

    let textColor = 'text-white';
    if (colorWillFailContrast(props.color)) {
        textColor = 'text-black';
    }
    return (
        <div
            className={`flex relative h-1/5 w-1/5 border-black border-2 box-border text-center justify-center items-center text-l ${textColor} p-1 ${squareColor}`}>
            {props.goalText}
            {props.draftedColor && (
                <div
                    className={`absolute rounded-full top-0 left-0 h-3 w-3 text-s m-1 border-black border-2 ${draftColor}`}></div>
            )}
        </div>
    );
}

function colorWillFailContrast(color: string): boolean {
    switch (color) {
        case 'bingosync-green':
        case 'bingosync-orange':
        case 'bingosync-red':
        case 'bingosync-blue':
        case 'bingosync-teal':
        case 'bingosync-pink':
        case 'bingosync-yellow':
            return true;
        default:
            return false;
    }
}

function getBgColorFromString(color: string) {
    if (color == 'bingosync-blank') {
        return 'bg-gray-900';
    } else {
        return 'bg-' + color;
    }
}
