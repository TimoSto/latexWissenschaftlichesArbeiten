import {BibEntry} from "@/api/bibEntries/Entry";

export default async function AnalyseFile(file: File): Promise<{entries: BibEntry[], error: string}> {
    const extension = file.name.substring(file.name.lastIndexOf('.'))
    if( extension !== '.bib' ) {
        return {
            entries: [],
            error: `type - ${extension}`
        }
    }

    const content = await file.text();

    const entryParts = separateEntries(content);

    const entries: BibEntry[] = [];

    entryParts.forEach((f: string) => {
        const type = getTypeOfEntry(f);
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
