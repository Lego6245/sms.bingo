import BingosyncColors, { bingosyncColorsToTailwindColors } from "../types/BingosyncColors";

export interface TwitchProps {
    twitchUrl: string,
    twitchProfilePictureUrl: string,
}

export interface PlayerHeaderProps {
    playerName: string,
    twitchProps?: TwitchProps
    bingosyncColorPrimary: BingosyncColors | string,
    bingosyncColorSecondary: BingosyncColors | string,
    countryCode: string,
    subHeader?: string
}

export default function PlayerHeader(props: PlayerHeaderProps) {
    const flagIconClass = 'flag-icon-' + props.countryCode;
    const gradientClasses = 'from-' + bingosyncColorsToTailwindColors(props.bingosyncColorPrimary) + ' to-' + bingosyncColorsToTailwindColors(props.bingosyncColorSecondary)
    return (
        <div>
                <div className="flex flex-row items-end">
                    <div>
                        <span className={"text-xl mr-5 flag-icon " + flagIconClass}></span>
                    </div>
                    <span className="text-3xl font-bold text-white">
                    {props.playerName}
                    </span>
                    {props.twitchProps && (
                        <div className="relative h-20 w-20 mx-5">
                            <img
                                src={props.twitchProps.twitchProfilePictureUrl}
                            />
                            <img
                                src="/TwitchGlitchPurple.svg"
                                className="absolute h-5 w-5 bottom-0 left-0"
                            />
                        </div>
                    )}
                    {props.subHeader && (
                        <span className="text-xl font-bold text-white ml-auto">
                            {props.subHeader}
                        </span>
                    )}
                </div>
                <div className={"my-3 h-2 bg-gradient-to-r " + gradientClasses}/>
            </div>
    )
}