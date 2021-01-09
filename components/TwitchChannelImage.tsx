export interface TwitchChannelImageProps {
    channel: string;
}

export default function TwitchChannelImage(props: TwitchChannelImageProps) {
    const { pictureUri, twitchLink } = getChannelData(props.channel);
    return (
        <div className="relative h-10 w-10">
            <a href={twitchLink}>
                <img src={pictureUri} />
                <img src="/TwitchGlitchPurple.svg" className="absolute h-3 w-3 bottom-0 left-0" />
            </a>
        </div>
    );
}

function getChannelData(channel: string) {
    switch (channel) {
        case 'SunshineCommunity':
            return {
                pictureUri: '/sunshinecommunity.png',
                twitchLink: 'https://twitch.tv/sunshinecommunity',
            };
        case 'Bingothon':
            return {
                pictureUri: '/bingothon.png',
                twitchLink: 'https://twitch.tv/bingothon',
            };
    }
}
