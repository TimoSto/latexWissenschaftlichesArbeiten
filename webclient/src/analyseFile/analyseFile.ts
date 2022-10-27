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

    console.log(content);

    return {
        entries: [],
        error: ''
    }
}
