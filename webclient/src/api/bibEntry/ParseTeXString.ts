
type Pair = {
    String: string,
    TeX: string
}

const pairs: Pair[] = [
    {
        String: '_',
        TeX: '{{\\_}}'
    },
    {
        String: ';',
        TeX: '{{;}}',
    },
    {//TODO: ggf vorher amp ersetzen
        String: '&',
        TeX: '{{\\&}}',
    },
    {
        String: '$',
        TeX: '{{\\$}}',
    },
    {
        String: '#',
        TeX: '{{\\#}}',
    },
    {
        String: '%',
        TeX: '{{\\%}}',
    },
    {
        String: 'á',
        TeX: "{{\\'{a}}}",
    },
    {
        String: 'â',
        TeX: '{{\\u{a}}}',
    },
    {
        String: 'å',
        TeX: '{{\\r{a}}}',
    },
    {
        String: 'é',
        TeX: "{{\\'{e}}}",
    },
    {
        String: 'è',
        TeX: '{{\\`{e}}}',
    },
    {
        String: '<',
        TeX: '{{\\textless}}',
    },
    {
        String: '>',
        TeX: '{{\\textgreater}}',
    },
    {
        String: '°',
        TeX: '{{\\degree}}',
    },
    {
        String: 'š',
        TeX: '{{\\v{s}}}',
    },
    {
        String: 'č',
        TeX: '{{\\v{c}}}',
    },
]

export function ParseTeXToString(s: string): string {
    pairs.forEach(p => {
        s = s.replaceAll(p.TeX, p.String);
    });

    return s;
}

export function ParseStringToTeX(s: string): string {
    pairs.forEach(p => {
        if( p.TeX === `{{\\${p.String}}}` ) {
            //search for all values that should be surrounded by {{\\}}
            const matches = [...s.matchAll(new RegExp(p.String === '$' ? /\$/ : p.String, 'g'))];
            let added = 0;
            matches.forEach(m => {
                if( m.index !== undefined ) {
                    const i = m.index + added;
                    //check if they are not surrounded
                    if( i < 3 || ( s.substring(i-3, i) !== '{{\\' && s.substring(i+p.String.length, i+p.String.length+2) !== '}}' ) ) {
                        s = s.substring(0, i) + p.TeX + s.substring(i + p.String.length);
                        added += p.TeX.length - p.String.length;
                    }
                }
            })
        } else {
            s = s.replaceAll(p.String, p.TeX);
        }
    })

    return s;
}
