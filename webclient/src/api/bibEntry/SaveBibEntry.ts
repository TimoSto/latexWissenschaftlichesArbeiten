import {BibEntry} from "@/api/bibEntry/BibEntry";

export default async function SaveBibEntry(obj: BibEntrySaveObj): Promise<Response> {


    return await fetch('/saveEntry', {
        method: 'POST',
        body: JSON.stringify(obj)
    });
}

export type BibEntrySaveObj = {
    Project: string,
    InitialKey: string,
    Entry: BibEntry
}
