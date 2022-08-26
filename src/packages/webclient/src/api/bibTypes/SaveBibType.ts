import {Field} from "@/api/bibTypes/BibType";

export default async function SaveType(project: string, initialName: string, typeName: string, fields: Field[], citeFields: Field[]): Promise<boolean> {
    const obj = JSON.stringify({
        Project: project,
        InitialName: initialName,
        Type: {
            Name: typeName,
            Fields: fields,
            CiteFields: citeFields
        }
    });

    const resp = await fetch('/saveType', {
        method: 'POST',
        body: obj
    })

    if( !resp.ok ) {
        console.error(resp.statusText)
        return false
    }

    return true
}