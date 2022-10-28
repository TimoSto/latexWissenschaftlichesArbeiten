import {BibEntry} from "@/api/bibEntries/Entry";

export default async function UploadEntries(project: string, entries: BibEntry[], override: boolean): Promise<boolean> {
    const resp = await fetch('/uploadEntries', {
        method: 'POST',
        body: JSON.stringify({
            Project: project,
            Entries: entries,
            Override: override
        })
    });

    return resp.ok;
}
