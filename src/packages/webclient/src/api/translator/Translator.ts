
const translations = [
    {
        regex: new RegExp("(?<=Entry with key )(.*)(?= already exists. Delete the old one or rename the new one.)"),
        german: "Es existiert bereits ein Literatureintrag mit der ID <VALUE>. Lösche den existierenden oder benennen diesen Eintrag anders."
    }
]

export default function Translate(str: string): string {
    let translated = str;
    translations.forEach(pair => {
        const value = str.match(pair.regex);
        console.log(value)
        if( value && value.length > 0 ) {
            translated = pair.german.replace('<VALUE>', value[0]);
        }
    });
    return translated
}