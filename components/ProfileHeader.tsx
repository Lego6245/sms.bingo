import BingosyncColors, { bingosyncColorsToTailwindColors } from '../types/BingosyncColors';
import PlayerData from '../types/PlayerData';
import Image from 'next/image';

export interface ProfileHeaderProps {
    playerData: PlayerData;
    subHeader?: string;
}

export default function ProfileHeader(props: ProfileHeaderProps) {
    const { playerData, subHeader } = props;
    const flagIconClass = getFlagIconClass(playerData.country);
    const gradientClasses =
        'from-' +
        bingosyncColorsToTailwindColors(playerData.primaryColor) +
        ' to-' +
        bingosyncColorsToTailwindColors(playerData.secondaryColor);
    return (
        <div>
            <div className="flex flex-row items-end">
                <div>
                    <span className={'text-2xl md:text-3xl mr-5 flag-icon ' + flagIconClass}></span>
                </div>
                <span className="text-4xl md:text-5xl mx-5 font-bold text-white">
                    {playerData.name}
                </span>
                {playerData.twitchName && (
                    <div className="mx-5">
                        <a href={encodeURI('https://twitch.tv/' + playerData.twitchName)}>
                            <Image
                                alt="The twitch glitch logo. Click here to visit the user's twitch profile"
                                height={40}
                                width={40}
                                src="/TwitchGlitchPurple.svg"
                                className="h-10 w-10"
                            />
                        </a>
                    </div>
                )}
                {subHeader && (
                    <span className="text-2xl md:text-3xl font-bold text-white ml-auto">
                        {playerData.division
                            ? 'Division ' + playerData.division
                            : 'Elo' + ': ' + subHeader}
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
