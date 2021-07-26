import PlayerData from './PlayerData';

export default function convertAirtableDataToPlayerData(record: any): PlayerData {
    return {
        name: record.get('Name') as string,
        primaryColor: (record.get('Primary') as string)?.toLowerCase() as any,
        secondaryColor: (record.get('Secondary') as string)?.toLowerCase() as any,
        country: (record.get('Country') as string)?.toLowerCase(),
        //division: record.get('Division') as string,
        twitchName: record.get('Twitch') as string,
        pronouns: (record.get('Pronouns') as string) ?? '',
        elo: record.get('Elo') as number,
    };
}
