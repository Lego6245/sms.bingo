import BingosyncColors from '../types/BingosyncColors';
import PlayerData from '../types/PlayerData';
import PlayerStanding from '../types/PlayerStanding';
import PlayerHeader from './PlayerHeader';

export interface StandingsTableProps {
    standings: PlayerData[];
}

export default function StandingsTable(props: StandingsTableProps) {
    return (
        <div className="w-full mx-auto">
            <div className="w-full text-3xl md:text-5xl font-bold text-center mb-5">
                {'Standings'}
            </div>
            <table className="w-full">
                <tbody>
                    {props.standings.length > 0 &&
                        props.standings.map(player => {
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
                                                player.elo.toString() != '-1'
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
