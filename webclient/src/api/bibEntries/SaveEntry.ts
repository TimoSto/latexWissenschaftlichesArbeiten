import {BibEntry} from "@/api/bibEntries/Entry";

export default async function SaveEntry(project: string, entry: BibEntry, initialName: string) {
    const obj = {
        Project: project,
        Entry: entry,
        InitialKey: initialName
    }

    console.log(obj)

    const resp = await fetch('/saveEntry', {
        method: 'POST',
        body: JSON.stringify(obj)
    });

    return resp.ok
}
