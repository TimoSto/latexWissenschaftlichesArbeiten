import {BibType} from "@/api/bibType/BibType";
import {GenerateModelForBibType} from "@/api/bibType/GenerateModelForBibTypes";
import {BibEntry} from "../../api/bibEntry/BibEntry";
import {ParseTeXToString} from "@/api/bibEntry/ParseTeXString";

export type ProjectData = {
    BibTypes: BibType[],
    BibEntries: BibEntry[],
    CompletelyLoaded: boolean
}

export default async function GetProjectData(project: string): Promise<ProjectData>{
    const resp = await fetch(`/projectData?project=${project}`)

    if( !resp.ok ) {
        return {
            BibTypes: [],
            BibEntries: [],
            CompletelyLoaded: false
        }
    }

    const obj = await resp.json() as ProjectData

    obj.BibTypes.forEach(t => {
        t.Model = GenerateModelForBibType(t.Fields);
        t.CiteModel = GenerateModelForBibType(t.CiteFields);
    });

    //TODO: chck if too long, otherwise show loading
    obj.BibEntries.forEach((e, i) => {
        const bType = obj.BibTypes.find(t => t.Name === e.Typ);
        if( bType ) {
            const bibFieldNames = bType.Fields.map(f => f.Field);
            const citeFields = bType.CiteFields.filter(f => bibFieldNames.indexOf(f.Field) === -1);

            e.Fields.forEach((f, j) => {
                if( j < bType.Fields.length ) {
                    if( !bType.Fields[j].TexValue ) {
                        obj.BibEntries[i].Fields[j] = ParseTeXToString(f)
                    }
                } else {
                    if( !citeFields[j - bibFieldNames.length].TexValue ) {
                        obj.BibEntries[i].Fields[j] = ParseTeXToString(f)
                    }
                }
            })
        }
    })

    obj.CompletelyLoaded = true;

    return obj;

}
