import {BibTypeSaveObj} from "@/api/bibType/BibType";

export default async function SaveType(obj: BibTypeSaveObj): Promise<Response> {

    return  await fetch('/saveType', {
        method: 'POST',
        body: JSON.stringify(obj)
    })
}