
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
    ['è','{{\\`{e}}}']
];

function repalceAt(str, index, replacement) {
    return str.substring(0, index) + replacement + str.substring(index + 1);
}

function replaceRange(str, index, length, replacement) {
    return str.substring(0, index) + replacement + str.substring(index + length);
}

export function ParseStringToTeX(value: string) {

    texValues.forEach(s => {
        if(s[0] === '&') {
            value = value.replaceAll('&', '{{\\&amp;}}');
            //console.log(value)
        } else {
            let index = value.indexOf(s[0], 0);
            while (index > -1 && !IsSurroundedByBrackets(value, index)) {
                //console.log(index)
                value = repalceAt(value, index, s[1]);
                index = value.indexOf(s[0], index + 5);
            }
        }
    });

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