import BingosyncColors from '../types/BingosyncColors';
import PlayerData from '../types/PlayerData';
import PlayerStanding from '../types/PlayerStanding';
import PlayerHeader from './PlayerHeader';

export interface StandingsTableProps {
    standings: PlayerData[];
    tableHeader?: string;
    computeSubHeader?: (player: PlayerData) => string | undefined;
}

export default function StandingsTable(props: StandingsTableProps) {
    const { standings, tableHeader, computeSubHeader } = props;
    return (
        <div className="w-full mx-auto">
            <div className="w-full text-3xl md:text-5xl font-bold text-center mb-5">
                {!!tableHeader ? tableHeader : 'Elo Standings'}
            </div>
            <table className="w-full">
                <tbody>
                    {standings.length > 0 &&
                        standings.map(player => {
                            return (
                                <tr key={player.name}>
                                    <td>
                                        <PlayerHeader
                                            playerName={player.name}
                                            playerId={player.id}
                                            bingosyncColorPrimary={player.primaryColor}
                                            bingosyncColorSecondary={player.secondaryColor}
                                            countryCode={player.country}
                                            subHeader={
                                                !!computeSubHeader
                                                    ? computeSubHeader(player)
                                                    : player.elo.toString() != '-1'
                                                    ? player.elo.toString()
                                                    : undefined
                                            }
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
