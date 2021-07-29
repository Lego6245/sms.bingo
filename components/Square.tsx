import * as React from 'react';

interface SquareProps {
    goalText: string;
    color: string;
}

export default function Square(props: SquareProps) {
    let color = props.color;
    if (props.color == 'bingosync-blank') {
        color = 'gray-900';
    }
    let textColor = 'text-white';
    if (colorWillFailContrast(color)) {
        textColor = 'text-black';
    }
    return (
        <div
            className={`flex h-1/5 w-1/5 border-black border-2 box-border text-center justify-center items-center text-l ${textColor} p-1 bg-${color}`}>
            {props.goalText}
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
