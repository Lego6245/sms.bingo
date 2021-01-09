enum BingosyncColors {
    Orange,
    Red,
    Blue,
    Green,
    Purple,
    Navy,
    Teal,
    Brown,
    Pink,
    Yellow
}

export type BingosyncColorStrings = 'orange' | 'red' | 'blue' | 'green' | 'purple' | 'navy' | 'teal' | 'brown' | 'pink' | 'yellow';

export function bingosyncColorsToTailwindColors(color: BingosyncColors | BingosyncColorStrings) {
    if (typeof color === "string") {
        return 'bingosync-' + color;
    }
    switch (color) {
        case BingosyncColors.Orange:
            return 'bingosync-orange';
        case BingosyncColors.Red:
            return 'bingosync-red';
        case BingosyncColors.Blue:
            return 'bingosync-blue';
        case BingosyncColors.Green:
            return 'bingosync-green';
        case BingosyncColors.Purple:
            return 'bingosync-purple';
        case BingosyncColors.Navy:
            return 'bingosync-navy';
        case BingosyncColors.Teal:
            return 'bingosync-teal';
        case BingosyncColors.Brown:
            return 'bingosync-brown';
        case BingosyncColors.Pink:
            return 'bingosync-pink';
        case BingosyncColors.Yellow:
            return 'bingosync-yellow';
}
}

export default BingosyncColors