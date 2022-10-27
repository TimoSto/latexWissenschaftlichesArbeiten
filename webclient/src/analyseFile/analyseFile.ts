import {BibEntry} from "@/api/bibEntries/Entry";

export interface AttributeValue {
    Attribute: string
    Value: string
}

export default async function AnalyseFile(file: File): Promise<{entries: BibEntry[], error: string}> {
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
        const type = getTypeOfEntry(f);

        //step 3: get key
        const key = extractKey(f)

        //step 4: extract attributes and values

        //step 5: find associated bibliography-type
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
    return e.substring(e.indexOf('{') + 1, e.indexOf(','))
}

export function extractEntryAttributes(e: string): AttributeValue[] {
    return []
}

export function findBibliographyType(citaviType: string): string {
    return ''
}
