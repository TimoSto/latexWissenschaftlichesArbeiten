/*
* Read the literature-types for a project from server
* */

import { BibType, Field } from "@/api/bibTypes/BibType";
import {GenerateModelForBibType} from "@/api/bibTypes/GenerateModelForBibTypes";

export default async function GetBibTypes(proj: string): Promise<BibType[]> {
    const resp = await fetch('/getBibTypes?project=' + proj)

    if( !resp.ok ) {
        return []
    }

    const obj = await resp.json()

    obj.Types.forEach( (bibType: BibType) => {

        bibType.Model = GenerateModelForBibType(bibType)
    } )

    return obj.Types
}