import {BibEntry} from "@/api/bibEntry/BibEntry";

export default async function UploadEntries(entries: BibEntry[], project: string): Promise<Response> {
    const obj = {
        Entries: entries,
        Project: project
    }

    const data = JSON.stringify(obj);

    return await fetch('/uploadEntries', {
        method: 'POST',
        body: data
    });
}