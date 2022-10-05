import {BibEntry} from "@/api/bibEntry/BibEntry";

export default async function UploadEntries(entries: BibEntry[], project: string, override: boolean): Promise<Response> {
    const obj = {
        Entries: entries,
        Project: project,
        Override: override
    }

    const data = JSON.stringify(obj);

    return await fetch('/uploadEntries', {
        method: 'POST',
        body: data
    });
}