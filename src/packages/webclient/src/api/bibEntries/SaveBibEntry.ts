import {BibEntry} from "@/api/bibEntries/BibEntry";

export default async function SaveBibEntry(jsonObj: string): Promise<boolean> {


    const resp = await fetch('/saveEntry', {
        method: 'POST',
        body: jsonObj
    });

    return resp.ok
}
