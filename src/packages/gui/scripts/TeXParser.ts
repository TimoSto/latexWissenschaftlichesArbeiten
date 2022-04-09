
const texValues = [
    ["_", `{{\\_}}`],
    [";","{{;}}"]
];

function repalceAt(str, index, replacement) {
    return str.substring(0, index) + replacement + str.substring(index + 1);
}

export function ParseStringToTeX(value: string) {

    texValues.forEach(s => {
        let index = value.indexOf(s[0], 0);
        while(index > -1 && !IsSurroundedByBrackets(value, index)) {
            console.log(index)
            value = repalceAt(value, index, s[1]);
            index = value.indexOf(s[0], index+5);
        }
    });

    return value;
}

function IsSurroundedByBrackets(str: string, i: number): boolean {
    if( i < 2 ) {
        return false;
    }
    return ( str.substr(i-2, 2) == '{{' || str.substr(i-3, 3) == '{{\\' ) && str.substr(i+1, 2) == '}}'
}