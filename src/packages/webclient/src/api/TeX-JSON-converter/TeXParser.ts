
const texValues = [
    ["_", `{{\\_}}`],
    [";","{{;}}"],
    ["&","{{\\&amp;}}"],
    ["$","{{\\$}}"],
    ["#","{{\\#}}"],
    ["%","{{\\%}}"],
    ["á","{{\\'{a}}}"],
    ['à','{{\\`{a}}}'],
    ['â','{{\\u{a}}}'],
    ['å','{{\\r{a}}}'],
    ["é","{{\\'{e}}}"],
    ['è','{{\\`{e}}}'],
    ['°','{{\\degree}}'],
    ['<','{{\\textless}}'],
    ['>','{{\\textgreater}}'],
    ['š','{{\\v{s}}}'],
    ['č','{{\\v{c}}}']
];

function repalceAt(str: string, index: number, replacement: string): string {
    return str.substring(0, index) + replacement + str.substring(index + 1);
}

function replaceRange(str: string, index: number, length: number, replacement: string): string {
    return str.substring(0, index) + replacement + str.substring(index + length);
}

type Replacement = {
    String: string,
    RegexToTeX: RegExp,
    TeX: string
}

const toReplaceWithTeX : Replacement[] = [
    {
        String: '_',
        TeX: '{{\\_}}',
        RegexToTeX: /(?<!\{\{\\)(_)|(_)(?!\}\})/g
    },
    {
        String: ';',
        TeX: '{{;}}',
        RegexToTeX: /(?<!\{\{)(;)|(;)(?!\}\})/g
    },
    {//TODO: ggf vorher amp ersetzen
        String: '&',
        TeX: '{{\\&}}',
        RegexToTeX: /(?<!\{\{\\)(&)|(&)(?!\}\})/g
    },
    {
        String: '$',
        TeX: '{{\\$}}',
        RegexToTeX: /(?<!\{\{\\)(\$)|(\$)(?!\}\})/g
    },
    {
        String: '#',
        TeX: '{{\\#}}',
        RegexToTeX: /(?<!\{\{\\)(#)|(#)(?!\}\})/g
    },
    {
        String: '%',
        TeX: '{{\\%}}',
        RegexToTeX: /(?<!\{\{\\)(%)|(%)(?!\}\})/g
    },
    {
        String: 'á',
        TeX: "{{\\'{a}}}",
        RegexToTeX: /á/g
    },
    {
        String: 'â',
        TeX: '{{\\u{a}}}',
        RegexToTeX: /â/g
    },
    {
        String: 'å',
        TeX: '{{\\r{a}}}',
        RegexToTeX: /å/g
    },
    {
        String: 'é',
        TeX: "{{\\'{e}}}",
        RegexToTeX: /é/g
    },
    {
        String: 'è',
        TeX: '{{\\`{e}}}',
        RegexToTeX: /è/g
    },
    {
        String: '<',
        TeX: '{{\\textless}}',
        RegexToTeX: /</g
    },
    {
        String: '>',
        TeX: '{{\\textgreater}}',
        RegexToTeX: />/g
    },
    {
        String: '°',
        TeX: '{{\\degree}}',
        RegexToTeX: /°/g
    },
    {
        String: 'š',
        TeX: '{{\\v{s}}}',
        RegexToTeX: /š/g
    },
    {
        String: 'č',
        TeX: '{{\\v{c}}}',
        RegexToTeX: /č/g
    },
]

export function ParseStringToTeX(value: string): string {

    toReplaceWithTeX.forEach(v => {
        value = value.replaceAll(v.RegexToTeX, v.TeX)
    })



    // value = value.replaceAll('{\\ss}', 'ß');
    // value = value.replaceAll('{\\\"u}', 'ü');
    // value = value.replaceAll('{\\\"o}', 'ö');
    // value = value.replaceAll('{\\\"a}', 'ä');
    // value = value.replaceAll('{\\\'e}', 'é');
    // value = value.replaceAll('{\\v{s}}', 'š');
    // value = value.replaceAll('{\\v{c}}', 'č');
    //
    // texValues.forEach(s => {
    //     if(s[0] === '&') {
    //         if(value.indexOf('{\\&}') >= 0) {
    //             value = value.replaceAll('{\\&}', '{{\\&amp;}}');
    //         } else {
    //             value = value.replaceAll('&', '{{\\&amp;}}');
    //         }
    //         //console.log(value)
    //     } else {
    //         let index = value.indexOf(s[0], 0);
    //         while (index > -1 && !IsSurroundedByBrackets(value, index)) {
    //             //console.log(index)
    //             value = repalceAt(value, index, s[1]);
    //             index = value.indexOf(s[0], index + 5);
    //         }
    //     }
    // });

    return value;
}

export function ParseTexToString(value: string) {

    texValues.forEach(s => {
        if(s[0] === '&') {
            value = value.replaceAll('{{\\&amp;}}', '&');
        } else {
            let index = value.indexOf(s[1], 0);
            while(index > -1 && !IsSurroundedByBrackets(value, index)) {
                value = replaceRange(value, index,s[1].length, s[0]);
                index = value.indexOf(s[1], index+s[0].length);
            }
        }

    });

    return value;
}

export function ParseBibToString(value: string) {

    texValues.forEach(s => {
        if(s[0] === '_') {
            value = value.replaceAll('{\\textunderscore }', '_');
        } else {
            let index = value.indexOf(s[1], 0);
            while(index > -1 && !IsSurroundedBySingleBrackets(value, index)) {
                value = replaceRange(value, index,s[1].length, s[0]);
                index = value.indexOf(s[1], index+s[0].length);
            }
        }

    });

    value = removeIntermediateBrackets(value)

    return value;
}

function IsSurroundedByBrackets(str: string, i: number): boolean {
    if( i < 2 ) {
        return false;
    }
    if( str.substring(i-3, i+5) == "{{\\&amp;}}") {
        return true;
    }

    return ( str.substr(i-2, 2) == '{{' || str.substr(i-3, 3) == '{{\\' ) && str.substr(i+1, 2) == '}}'
}

function IsSurroundedBySingleBrackets(str: string, i: number): boolean {
    if( i < 2 ) {
        return false;
    }
    if( str.substring(i-3, i+5) == "{\\&amp;}") {
        return true;
    }

    return ( str.substr(i-1, 1) == '{' || str.substr(i-2, 2) == '{\\' ) && str.substr(i+1, 1) == '}'
}

function removeIntermediateBrackets(value: string): string {
    let bsOened = 0;
    const sinds = [];

    for( let i = 0; i < value.length ; i++ ) {
        if( value.charAt(i) === '{' ) {
            bsOened ++;
            sinds.push(i)
        } else if (value.charAt(i) === '}' ) {
            if(bsOened>0) {
                bsOened--;
                sinds.pop()
            } else {
                value=value.substring(0,i) + value.substring(i+1);
            }
        }
    }

    if (bsOened > 0) {
        value = value.substring(0, sinds[0])
    }

    return value;
}