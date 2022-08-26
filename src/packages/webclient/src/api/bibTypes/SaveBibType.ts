import {Field} from "@/api/bibTypes/BibType";

export default async function SaveType(obj: string): Promise<boolean> {

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