import Airtable from 'airtable';
import type { AirtableBase } from 'airtable/lib/airtable_base';

export default function getBase(): AirtableBase {
    return Airtable.base(process.env.AIRTABLE_BASE_ID);
}

export function getBaseName(baseType: 'matches' | 'players' | 'match data') {
    switch (baseType) {
        case 'matches':
            return 'Season 4 Matches';
        case 'players':
            return 'Season 4 Players';
        case 'match data':
            return 'Season 4 Match Data';
    }
}
