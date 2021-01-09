import BingosyncColors from '../types/BingosyncColors';
import PlayerData from '../types/PlayerData';
import PlayerStanding from '../types/PlayerStanding';
import PlayerHeader from './PlayerHeader';

export interface StandingsTableProps {
    division: string;
    standings: PlayerStanding[];
}

export default function StandingsTable(props: StandingsTableProps) {
    return (
        <div className="w-full mx-auto">
            <div className="w-full text-3xl md:text-5xl font-bold text-center mb-5">
                {'Division ' + props.division}
            </div>
            <table className="w-full">
                <tbody>
                    {props.standings.length > 0 &&
                        props.standings.map(standingRow => {
                            let player: PlayerData;
                            if (typeof standingRow.player === 'string') {
                                player = {
                                    name: standingRow.player,
                                    primaryColor: BingosyncColors.Yellow,
                                    secondaryColor: BingosyncColors.Blue,
                                    country: '',
                                    division: props.division,
                                };
                            } else {
                                player = standingRow.player;
                            }
                            return (
                                <tr key={player.name}>
                                    <td>
                                        <PlayerHeader
                                            playerName={player.name}
                                            bingosyncColorPrimary={player.primaryColor}
                                            bingosyncColorSecondary={player.secondaryColor}
                                            countryCode={player.country}
                                            subHeader={
                                                standingRow.wins +
                                                ' - ' +
                                                (standingRow.totalGames - standingRow.wins)
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
