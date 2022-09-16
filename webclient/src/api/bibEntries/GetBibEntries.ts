import {BibEntry} from "@/api/bibEntries/BibEntry";

export default async function GetBibEntries(proj: string): Promise<BibEntry[]> {
    const resp = await fetch('/getBibEntries?project=' + proj)

    if (!resp.ok) {
        return []
    }

    return await resp.json();
}