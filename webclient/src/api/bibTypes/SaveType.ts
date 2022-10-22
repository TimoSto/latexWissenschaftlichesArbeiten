import {BibType} from "@/api/bibTypes/BibType";

export default async function SaveType(btype: BibType, project: string, initialName: string): Promise<boolean> {
    const obj = {
        Type: btype,
        InitialName: initialName,
        Project: project
    }
    const data = JSON.stringify(obj);

    const resp = await fetch('/saveTypes', {
        method: 'POST',
        body: data
    })

    return resp.ok;
}
