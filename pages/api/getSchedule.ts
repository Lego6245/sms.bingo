import Cors from 'cors';
import MatchData from '../../types/MatchData';
import PlayerData from '../../types/PlayerData';
import { RunData } from '../../types/RunData';
import { v4 as uuidv4 } from 'uuid';
import Airtable from 'airtable';
import convertAirtableDataToMatchData from '../../types/convertAirtableDataToMatchData';
import convertAirtableDataToPlayerData from '../../types/convertAirtableDataToPlayerData';

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, result => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}

async function handler(req, res) {
    // Run the middleware
    await runMiddleware(req, res, cors);

    const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
    const matches: MatchData[] = [];
    await base('Season 3 Matches')
        .select({
            filterByFormula:
                'AND(DATETIME_DIFF({Match Time (UTC)}, NOW(),"hours") <= 24, OR({Restream Channel} = "Bingothon", {Restream Channel} = "SunshineCommunity"))',
            sort: [{ field: 'Match Time (UTC)' }],
        })
        .eachPage((records, fetchNextPage) => {
            try {
                records.forEach(record => {
                    matches.push(convertAirtableDataToMatchData(record));
                });
                fetchNextPage();
            } catch (e) {
                return;
            }
        });
    const playerMap = new Map<string, PlayerData>();
    await base('Season 3 Players')
        .select()
        .eachPage((records, fetchNextPage) => {
            records.forEach(record => {
                playerMap.set(record.id, convertAirtableDataToPlayerData(record));
            });
            try {
                fetchNextPage();
            } catch {
                return;
            }
        });
    let processedMatches = matches.map(match =>
        convertToSpeedControlFormat(
            match,
            playerMap.get(match.homePlayerId),
            playerMap.get(match.awayPlayerId)
        )
    );
    res.json(processedMatches);
}

function convertToSpeedControlFormat(
    match: MatchData,
    homePlayer: PlayerData,
    awayPlayer: PlayerData
): RunData {
    const homeTeamId = uuidv4();
    const awayTeamId = uuidv4();
    return {
        game: 'Super Mario Sunshine',
        gameTwitch: 'Super Mario Sunshine',
        category: match.format,
        scheduledS: match.matchTime,
        id: uuidv4(),
        teams: [
            {
                id: homeTeamId,
                players: [
                    {
                        name: homePlayer.name,
                        id: uuidv4(),
                        teamID: homeTeamId,
                        country: convertCountryForNodeCG(homePlayer.country),
                        pronouns: homePlayer.pronouns,
                        social: {
                            twitch: homePlayer.twitchName,
                        },
                        customData: {
                            score: homePlayer.elo.toString(),
                        },
                    },
                ],
            },
            {
                id: awayTeamId,
                players: [
                    {
                        name: awayPlayer.name,
                        id: uuidv4(),
                        teamID: awayTeamId,
                        country: convertCountryForNodeCG(awayPlayer.country),
                        pronouns: awayPlayer.pronouns,
                        social: {
                            twitch: awayPlayer.twitchName,
                        },
                        customData: {
                            score: awayPlayer.elo.toString(),
                        },
                    },
                ],
            },
        ],
        customData: {
            Bingotype: convertFormatToBingotype(match.format),
        },
    };
}

function convertCountryForNodeCG(country: string): string {
    switch (country) {
        case 'FR-QC':
            return 'ca/qc';
        case 'GB-ENG':
            return 'gb/eng';
        default:
            return country.toLowerCase();
    }
}

function convertFormatToBingotype(format: string): string {
    switch (format) {
        case 'Invasion':
            return 'invasion';
        case 'Connect 5':
            return 'connect5';
        case 'Draft':
            return 'draftlockout';
        case 'Row Control':
            return 'rowcontrol';
        default:
        case 'Lockout':
            return 'lockout';
    }
}

export default handler;
