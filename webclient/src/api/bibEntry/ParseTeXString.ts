
type Pair = {
    String: string,
    TeX: string
}

const pairs: Pair[] = [
    {String: '_', TeX: '{{\\_}}'}
]

export function ParseTeXToString(s: string): string {
    pairs.forEach(p => {
        s = s.replaceAll(p.TeX, p.String);
    });

    return s;
}