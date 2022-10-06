import {BibEntry} from "@/api/bibEntry/BibEntry";
import {ParseStringToTeX} from "@/api/bibEntry/ParseTeXString";

export default async function SaveBibEntry(obj: BibEntrySaveObj): Promise<Response> {

    obj = JSON.parse(JSON.stringify(obj));

    obj.Entry.Fields.forEach(((f,i) => {
        obj.Entry.Fields[i] = ParseStringToTeX(f);
    }));

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
