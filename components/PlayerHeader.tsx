import Link from 'next/link';
import Image from 'next/image';
import BingosyncColors, {
    bingosyncColorsToTailwindColors,
    BingosyncColorStrings,
} from '../types/BingosyncColors';

export interface TwitchProps {
    twitchUrl: string;
    twitchProfilePictureUrl: string;
}

export interface PlayerHeaderProps {
    playerName: string;
    twitchProps?: TwitchProps;
    bingosyncColorPrimary: BingosyncColors | BingosyncColorStrings;
    bingosyncColorSecondary: BingosyncColors | BingosyncColorStrings;
    countryCode: string;
    subHeader?: string;
    playerId?: string;
}

export default function PlayerHeader(props: PlayerHeaderProps) {
    const flagIconClass = getFlagIconClass(props.countryCode);
    const gradientClasses =
        'from-' +
        bingosyncColorsToTailwindColors(props.bingosyncColorPrimary) +
        ' to-' +
        bingosyncColorsToTailwindColors(props.bingosyncColorSecondary);
    return (
        <div>
            <div className="flex flex-row items-end">
                <div>
                    <span className={'text-lg md:text-xl mr-5 flag-icon ' + flagIconClass}></span>
                </div>
                <Link href={'/player/' + (props.playerId ?? props.playerName)}>
                    <span className="text-2xl md:text-3xl mx-5 font-bold text-white cursor-pointer">
                        {props.playerName}
                    </span>
                </Link>
                {props.twitchProps && (
                    <div className="relative h-20 w-20 mx-5">
                        <Image
                            layout="fill"
                            alt={`${props.playerName}'s profile picture`}
                            src={props.twitchProps.twitchProfilePictureUrl}
                        />
                        <div className="absolute h-5 w-5 bottom-0 left-0">
                            <Image
                                alt="The twitch logo"
                                src="/TwitchGlitchPurple.svg"
                                layout="fill"
                            />
                        </div>
                    </div>
                )}
                {props.subHeader && (
                    <span className="text-lg md:text-xl font-bold text-white ml-auto">
                        {props.subHeader}
                    </span>
                )}
            </div>
            <div className={'my-1 md:my-3 h-1 md:h-2 bg-gradient-to-r ' + gradientClasses} />
        </div>
    );
}

function getFlagIconClass(country: string): string {
    switch (country) {
        case 'fr-qc':
            return 'bg-fr-qc';
        default:
            return 'flag-icon-' + country;
    }
}
