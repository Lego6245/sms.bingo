import Airtable from 'airtable';
import type { AirtableBase } from 'airtable/lib/airtable_base';

export default function getBase(): AirtableBase {
    return Airtable.base(process.env.AIRTABLE_BASE_ID);
}

export function getBaseName(
    baseType:
        | 'matches'
        | 'players'
        | 'match data'
        | 'non-lockout matches'
        | 'non-lockout players'
        | 'non-lockout match data'
) {
    switch (baseType) {
        case 'matches':
            return 'Season 5 Matches';
        case 'players':
            return 'Season 5 Players';
        case 'match data':
            return 'Season 5 Match Data';
        case 'non-lockout matches':
            return '2022 Non Lockout Matches';
        case 'non-lockout players':
            return '2022 Non Lockout Players';
        case 'non-lockout match data':
            return '2022 Non Lockout Match Data';
    }
}

export function getRevalidateTimer(isLong?: boolean) {
    return isLong ? 6000 : 600;
}
