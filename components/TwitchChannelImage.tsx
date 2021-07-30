import Image from 'next/image';

export interface TwitchChannelImageProps {
    channel: string;
    forBroadcast?: boolean;
}

export default function TwitchChannelImage(props: TwitchChannelImageProps) {
    const { pictureUri, twitchLink } = getChannelData(props.channel);
    const size = props.forBroadcast ? 'h-20 w-20' : 'h-10 w-10';
    const sizePx = props.forBroadcast ? 80 : 40;
    return (
        <div className={'relative ' + size}>
            <a href={twitchLink}>
                <Image layout="fill" src={pictureUri} />
                {!props.forBroadcast && (
                    <Image
                        layout="fill"
                        src="/TwitchGlitchPurple.svg"
                        className="absolute h-3 w-3 bottom-0 left-0"
                    />
                )}
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
