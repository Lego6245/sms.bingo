import PlayerHeader from "./PlayerHeader"

export interface StandingsTableProps {
    division: string,
    standings: any[],
}

export default function StandingsTable(props: StandingsTableProps) {
    return (
        <div className="w-full mx-auto">
            <div className="w-full text-5xl font-bold text-center mb-5">{"Division " + props.division}</div>
            <table className="w-full">
                {props.standings.length > 0 && props.standings.map(standingRow => {
                    return (
                    <tr>
                        <td>
                            <PlayerHeader
                                playerName={standingRow.player.name}
                                bingosyncColorPrimary={standingRow.player.primaryColor}
                                bingosyncColorSecondary={standingRow.player.secondaryColor}
                                countryCode={standingRow.player.country}
                                subHeader={standingRow.wins + " - " + (standingRow.totalGames - standingRow.wins)}
                            />
                        </td>
                    </tr>
                    )
                })}
            </table>
        </div>
    )
}