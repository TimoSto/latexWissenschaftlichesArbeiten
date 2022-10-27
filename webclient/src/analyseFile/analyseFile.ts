import {BibEntry} from "@/api/bibEntries/Entry";
import GeneralizeTeXEscaping from "@/analyseFile/parseBibValues";
import {BibType} from "@/api/bibTypes/BibType";

export interface AttributeValue {
    Attribute: string
    Value: string
}

export default async function AnalyseFile(file: File, types: BibType[]): Promise<{entries: BibEntry[], error: string}> {
    const extension = file.name.substring(file.name.lastIndexOf('.'))
    if( extension !== '.bib' ) {
        return {
            entries: [],
            error: `type - ${extension}`
        }
    }

    const content = await file.text();

    //step 1: separate entries
    const entryParts = separateEntries(content);

    const entries: BibEntry[] = [];

    entryParts.forEach((f: string) => {
        //step 2: get citavi-type of entry
        const cType = getTypeOfEntry(f);

        //step 3: get key
        const key = extractKey(f)

        //step 4: extract attributes and values
        const attributePairs = extractEntryAttributes(f)

        //step 5: find associated bibliography-type
        const bType = findBibliographyType(cType, attributePairs, types);

        //step 6: create entry of type with values

    })

    return {
        entries: entries,
        error: ''
    }
}

export function separateEntries(file: string): string[] {
    file = file.substring(file.indexOf('@'))

    file = file.replace(/\t/g, '');

    return file.split(/^@/gm).filter(e => e.length > 0);
}

export function getTypeOfEntry(e: string): string {
    if( e.charAt(0) === '@' ) {
        e = e.substring(1)
    }
    return e.substring(0, e.indexOf('{'))
}

export function extractKey(e: string): string {
    let k = e.substring(e.indexOf('{') + 1, e.indexOf(','));
    while(k.charAt(0) === '\t' ) {
        k = k.substring(1);
    }
    return k
}

export function extractEntryAttributes(e: string): AttributeValue[] {
    //only have arguments
    e = e.substring(e.indexOf('{') + 1, e.lastIndexOf('}'));

    //rm all newlines and indents to be equal in all export formats (springer vs ieee vs ...)
    e = e.replaceAll('\n', '');
    e = e.replaceAll('\t', '');

    //split at comma not in quotes
    const re = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/
    const lines = e.split(re);
    //ignore first because first is key
    lines.shift()

    const attributes: AttributeValue[] = []

    lines.forEach(l => {
        const eqIndex = l.indexOf('=');
        if( eqIndex > 0 ) {
            attributes.push({
                Attribute: l.substring(0, eqIndex),
                Value: GeneralizeTeXEscaping(l.substring(eqIndex + 1))
            })
        }
    })

    return attributes
}

export function findBibliographyType(citaviType: string, attributes: AttributeValue[], types: BibType[]): BibType {

    let typeToReturn: BibType = {
        CitaviNecessaryFields: [],
        CitaviType: "",
        CiteFields: [],
        CiteModel: "",
        Fields: [],
        Model: "",
        Name: ""
    };
    types.forEach(t => {
        if( t.CitaviType === citaviType ) {
            let allFound = true;

            const attrNames = attributes.map(a => a.Attribute);
            t.CitaviNecessaryFields.forEach(f => {
                if( attrNames.indexOf(f) === -1 ) {
                    allFound = false;
                }
            })

            if( allFound ) {
                typeToReturn = t;
            }
        }
    })

    return typeToReturn;
}

export function CreateEntry(type: BibType, attributes: AttributeValue[], key: string): BibEntry {
    const entry: BibEntry = {
        Key: key,
        Typ: type.Name,
        CiteNumber: 0,
        CitePreview: '',
        BibPreview: '',
        Fields: []
    }

    //fill fields with attribute names
    type.Fields.forEach(f => {
        //setting attribute name as default
        entry.Fields.push(f.Field)
        //looking for citavi-attribute matching the configured citavi-attributes of field
        attributes.forEach(a => {
            if( f.CitaviAttributes.indexOf(a.Attribute) >= 0 ) {
                const i = entry.Fields.indexOf(f.Field);
                if( i >= 0 ) {
                    entry.Fields[i] = a.Value;
                }
            }
        })
    });

    const bibFields = type.Fields.map(f => f.Field);

    type.CiteFields.forEach(f => {
        if( bibFields.indexOf(f.Field) === -1 ) {
            //setting attribute name as default
            entry.Fields.push(f.Field)
            //looking for citavi-attribute matching the configured citavi-attributes of field d
            attributes.forEach(a => {
                if( f.CitaviAttributes.indexOf(a.Attribute) >= 0 ) {
                    entry.Fields[entry.Fields.indexOf(f.Field)] = a.Value;
                }
            })
        }
    });

    for( let i = 0 ; i < attributes.length ; i++ ) {
        const index = entry.Fields.indexOf(attributes[i].Attribute)
        if (index > -1 ) {
            entry.Fields[index] = attributes[i].Value;
        }
    }

    return entry
}
