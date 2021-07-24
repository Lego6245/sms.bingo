import Cors from 'cors';
import importCsvForBuild from '../../scripts/importCsvForBuild';
import MatchData from '../../types/MatchData';
import PlayerData from '../../types/PlayerData';
import { RunData } from '../../types/RunData';
import { v4 as uuidv4 } from 'uuid';

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

    const { matches, players } = await importCsvForBuild();
    const firstTimestamp = Math.floor(Date.now() / 1000) - 60 * 60 * 2;
    const lastTimestamp = Math.floor(Date.now() / 1000) + 604800;
    let onlyScheduled = matches
        .filter(
            match =>
                match.status != 'unscheduled' &&
                match.matchTime >= firstTimestamp &&
                match.matchTime <= lastTimestamp &&
                match.channel != 'Offline'
        )
        .sort((a, b) => {
            return !!a.matchTime ? (!!b.matchTime ? a.matchTime - b.matchTime : -1) : 1;
        });
    let processedMatches = onlyScheduled.map(match =>
        convertToSpeedControlFormat(
            match,
            players.get(match.homePlayer),
            players.get(match.awayPlayer)
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
                        customData: {},
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
                        customData: {},
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
