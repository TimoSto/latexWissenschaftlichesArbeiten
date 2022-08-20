/*
* Read the literature-types for a project from server
* */

import BibType from "@/views/domain/BibType";

export default async function GetBibTypes(proj: string): Promise<BibType[]> {
    const resp = await fetch('/getBibTypes?project=' + proj)

    if( !resp.ok ) {
        return []
    }

    const obj = await resp.json()

    return obj
}