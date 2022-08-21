/*
* Read the literature-types for a project from server
* */

import { BibType, Field } from "@/api/bibTypes/BibType";

export default async function GetBibTypes(proj: string): Promise<BibType[]> {
    const resp = await fetch('/getBibTypes?project=' + proj)

    if( !resp.ok ) {
        return []
    }

    const obj = await resp.json()

    obj.Types.forEach( (bibType: BibType) => {
        bibType.Model = '';

        bibType.Fields.forEach( (field: Field) => {

            bibType.Model += field.Prefix

            switch (field.Style) {
                case 'italic':
                    bibType.Model += `<i>`;
                    break;
                case 'bold':
                    bibType.Model += '<b>';
                    break;
            }

            bibType.Model += field.Field

            switch (field.Style) {
                case 'italic':
                    bibType.Model += `</i>`;
                    break;
                case 'bold':
                    bibType.Model += '</b>';
                    break;
            }

            bibType.Model += field.Suffix;

        });
    } )

    return obj.Types
}