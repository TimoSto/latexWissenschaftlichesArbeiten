import {DragNDropResp, Entry} from "@/api/TeX-JSON-converter/AnalyseDroppedFiles";
import {Value} from "sass";

type UploadEntry = {
    ValuePairs: {Value: string, Attr: string}[];
    Key: string
    Typ: string
}

export default async function UploadEntries(entries: Entry[], project: string) {
    const objToUpload = {
        Project: project,
        Entries: <UploadEntry[]>[]
    }

    console.log(entries)

    entries.forEach(entry => {
        const obj = <UploadEntry>{
            Key: entry.Key,
            Typ: entry.Typ,
            ValuePairs: entry.ValuePairs,
        };

        objToUpload.Entries.push(obj)
    });

    return window.fetch('/uploadEntries', {
        method: 'POST',
        body: JSON.stringify(objToUpload)
    })
}