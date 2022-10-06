
type Pair = {
    String: string,
    TeX: string,
    ValueSurroundedByCmd: string
    RegexSurroundedByCmd: RegExp
}

const pairs: Pair[] = [
    {String: '_', TeX: '{{\\_}}', ValueSurroundedByCmd: '_', RegexSurroundedByCmd:/_/g}
]

export function ParseTeXToString(s: string): string {
    pairs.forEach(p => {
        s = s.replaceAll(p.TeX, p.String);
    });

    return s;
}

export function ParseStringToTeX(s: string): string {
    pairs.forEach(p => {
        //search for all values that should be surrounded by {{\\}}
        const matches = [...s.matchAll(p.RegexSurroundedByCmd)];
        let added = 0;
        matches.forEach(m => {
            if( m.index !== undefined ) {
                const i = m.index + added;
                //check if they are not surrounded
                if( i < 3 || ( s.substring(i-3, i) !== '{{\\' && s.substring(i+p.ValueSurroundedByCmd.length, i+p.ValueSurroundedByCmd.length+2) !== '}}' ) ) {
                    s = s.substring(0, i) + p.TeX + s.substring(i + p.ValueSurroundedByCmd.length);
                    added += p.TeX.length - p.ValueSurroundedByCmd.length;
                }
            }
        })
    })

    return s;
}
