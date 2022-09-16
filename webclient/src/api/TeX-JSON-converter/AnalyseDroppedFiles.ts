import {ParseBibToString, ParseStringToTeX} from "@/api/TeX-JSON-converter/TeXParser";
import {BibType} from "@/api/bibTypes/BibType";

export type Entry = {
    ValuePairs: {Value: string, Attr: string}[];
    Key: string
    Typ: string
}

export type DragNDropResp = {
    Valid: boolean
    Message: string,
    Unknown: string[],
    Empty: string[],
    Entries: Entry[]
}

export default function AnalyseDroppedFiles(file: string, types: BibType[]): DragNDropResp {

    if(file.indexOf('@') == -1) {
        return {
            Empty: [],
            Entries: [],
            Unknown: [],
            Valid: false,
            Message: 'Die hochgeladene Datei hat ein ungültiges Format. Bitte stelle sicher, dass die hochgeladene Datei einen korrekten .bib-Syntax hat.'
        }
    }

    //remove all linebreaks to have consistent format over all exports (Springer vs. IEEE vs. ...)
    file = file.replaceAll('\n', '');
    file = file.replaceAll('\r', '');

    const entries: Entry[] = [];

    const unknown = [];
    const empty = [];

    while( file.indexOf('@') >= 0 ) {
        //remove stuff before first '@'
        file = file.substr(file.indexOf('@'));

        const nextEntryIndex = file.substr(1).indexOf('@');

        let entryFile = file.substr(0, nextEntryIndex >= 0 ? nextEntryIndex + 1 : file.length)

        file = nextEntryIndex >= 0 ? file.substr(nextEntryIndex) : '';

        //type = string between first '@' and first '{'
        const type = entryFile.substring(1, entryFile.indexOf('{')).toLowerCase();

        entryFile = entryFile.substr(entryFile.indexOf('{') + 1, entryFile.lastIndexOf('}') - 1)

        const key = entryFile.substr(0, entryFile.indexOf(','))
        entryFile = entryFile.substr(entryFile.indexOf(',') + 1)

        //TODO: kommas per regex

        // entryFile = entryFile.replaceAll(`\"`, '');
        // console.log(entryFile)

        const valuePairs: string[][] = []

        const commasNotInsideQuotes = entryFile.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        const arr = [...commasNotInsideQuotes]

        arr.forEach(vp => {
            const firstIndexOfEqual = vp.indexOf('=');
            let p1, p2;
            if ( firstIndexOfEqual > 0) {
                p1 = vp.substring(0, firstIndexOfEqual)
                p2 = vp.substring(firstIndexOfEqual + 1)
                p1 = RemoveTrailingAndLeading(p1, '{');
                p2 = RemoveTrailingAndLeading(p2, '}');
                p1 = RemoveTrailingAndLeading(p1, ' ');
                p2 = RemoveTrailingAndLeading(p2, ' ');
                p1 = RemoveTrailingAndLeading(p1, '"');
                p2 = RemoveTrailingAndLeading(p2, '"');

                let value = ParseBibToString(p2);

                value = ParseStringToTeX(value);

                valuePairs.push([p1, value])
            }
        });

        const FoundFields = valuePairs.map(v => v[0])
        console.log(FoundFields)

        let typeToApply: BibType | undefined;

        for( let i = 0; i < types.length ; i++ ) {
            if( types[i].CitaviType === type ) {
                let fieldsFound = true;
                if( !types[i].CitaviNecessaryFields ) {
                    typeToApply = types[i];
                    break;
                }
                types[i].CitaviNecessaryFields.forEach(f => {
                    if( FoundFields.indexOf(f) === -1 ) {
                        fieldsFound = false;
                    }
                });
                if( fieldsFound ) {
                    typeToApply = types[i];
                    break;
                }
            }
        }

        if( !typeToApply ) {
            unknown.push(key);
            continue;
        }

        const sortedvaluepairs = SortValues(valuePairs, typeToApply);

        if( sortedvaluepairs.length === 0 ) {
            if( valuePairs.length === 0 ) {
                empty.push(key)
            } else {
                unknown.push(type)
            }
            continue;
        }

        entries.push(<Entry>{
            Typ: typeToApply.Name,
            Key: key,
            ValuePairs: sortedvaluepairs
        });
    }

    let msg = `Folgende Einträge werden hochgeladen werden:\n`;
    entries.forEach(e => {
        msg += '<b><i>' + e.Key + '\n' + '</i></b>';
    })

    if( empty.length > 0 ) {
        msg += '\n';
        msg += 'Folgende Einträge sind leer und werden deshalb ignoriert:\n';
        empty.forEach(e => {
            msg += '<b><i>' + e + '\n' + '</i></b>';
        })
    }

    if( unknown.length > 0 ) {
        msg += '\n';
        msg += 'Folgende Typen sind unbekannt und werden deshalb ignoriert:\n';
        unknown.forEach(e => {
            msg += '<b><i>' + e + '\n' + '</i></b>';
        });
    }

    return {
        Empty: empty,
        Entries: entries,
        Unknown: unknown,
        Valid: true,
        Message: msg
    }
}

function RemoveTrailingAndLeading(str: string, ch: string): string {
    while(str.charAt(0) === ch) {
        str = str.substr(1);
    }

    while(str.charAt(str.length - 1) === ch) {
        str = str.substr(0, str.length - 1);
    }

    return str
}

function AttrExists(valuepairs: string[][], attr: string): boolean {
    let found = false;
    valuepairs.forEach(pair => {
        if(pair[0] === attr) {
            found = true;
        }
    });
    return found
}
function SortValues(valuepairs: string[][], type: BibType):{Attr: string, Value: string}[] {
    const sortedPairs: {Attr: string, Value:string}[] = [];
    valuepairs.forEach(pair => {
        const index = getIndex(pair[0], type)
        if( index >= 0 ) {
            sortedPairs[index] = {Attr: pair[0], Value: pair[1]};
        }
    });
    return sortedPairs;
}

function getIndex(attr: string, type: BibType) {
    for( let i = 0 ; i < type.Fields.length ; i++ ) {
        if( type.Fields[i].CitaviAttributes ) {
            if( type.Fields[i].CitaviAttributes.indexOf(attr) >= 0 ) {
                return i
            }
        }
    }
    return -1
}
