
type Translation = {
    key: string
    regex: RegExp,
    german: string
}

const translations: Translation[] = [
    {
        key: '',
        regex: new RegExp("(?<=Entry with key )(.*)(?= already exists. Delete the old one or rename the new one.)"),
        german: "Es existiert bereits ein Literatureintrag mit der ID <VALUE>. Lösche den existierenden oder benennen diesen Eintrag anders."
    },
    {
        key: '',
        regex: new RegExp("(?<=Type with name )(.*)(?= already exists. Delete the old one or rename the new one.)"),
        german: "Es existiert bereits ein Literaturtyp mit der Bezeichnung <VALUE>. Lösche den existierenden oder benennen diesen Literaturtyp anders."
    },
    {
        key: '',
        regex: new RegExp("(?<=Created Backup at )(.*)"),
        german: `Backup erfolgreich erstellt: <i><VALUE></i>`
    },
]

export default function Translate(str: string): string {
    let translated = str;
    translations.forEach(pair => {
        if( pair.key.length == 0 ) {
            const value = str.match(pair.regex);
            if( value && value.length > 0 ) {
                translated = pair.german.replaceAll('<VALUE>', value[0]);
            }
        }
    });
    return translated
}