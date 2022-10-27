//some strings like ß dont need to be used with tex-code
//generelize, e.g. \_ and \textunderscore

const replacableValues: string[][] = [
    ['{{\\ss}}', 'ß'],
    ['{{\\textunderscore}}', '{{\\_}}']
]

//TODO: unittests

export default function GeneralizeTeXEscaping(s: string): string {
    replacableValues.forEach(v => {
        s = s.replaceAll(v[0], v[1])
    });

    s = RemoveTrailingAndLeading(s, '{')
    s = RemoveTrailingAndLeading(s, '}')
    s = RemoveTrailingAndLeading(s, ' ')
    s = RemoveTrailingAndLeading(s, '\\')
    s = RemoveTrailingAndLeading(s, '"')

    return s;
}

export function RemoveTrailingAndLeading(str: string, ch: string): string {
    //TODO: dont rm { or } if part of command-escaping
    while(str.charAt(0) === ch) {
        str = str.substr(1);
    }

    while(str.charAt(str.length - 1) === ch) {
        str = str.substr(0, str.length - 1);
    }

    return str
}
