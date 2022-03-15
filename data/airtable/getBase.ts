import Airtable from 'airtable';
import type { AirtableBase } from 'airtable/lib/airtable_base';

export default function getBase(): AirtableBase {
    return Airtable.base(process.env.AIRTABLE_SEASON_3_BASE);
}

export function getBaseName(baseType: 'matches' | 'players' | 'match data') {
    switch (baseType) {
        case 'matches':
            return 'Season 3 Matches';
        case 'players':
            return 'Season 3 Players';
        case 'match data':
            return 'Season 3 Match Data';
    }
}

export function getRevalidateTimer(isLong?: boolean) {
    return undefined;
}
