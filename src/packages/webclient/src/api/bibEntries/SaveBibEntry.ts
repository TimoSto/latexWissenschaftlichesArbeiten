import {BibEntry} from "@/api/bibEntries/BibEntry";

export default async function SaveBibEntry(bibEntry: BibEntry, initialKey: string, project: string): Promise<boolean> {
    const SaveObj = {
        InitialKey: initialKey,
        Project: project,
        Entry: {
            Key: bibEntry.Key,
            Typ: bibEntry.Typ,
            Fields: bibEntry.Fields,
        }
    }

    const jsonObj = JSON.stringify(SaveObj);

    const resp = await fetch('/saveEntry', {
        method: 'POST',
        body: jsonObj
    });

    return resp.ok
}
