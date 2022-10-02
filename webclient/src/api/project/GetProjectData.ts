import {BibType} from "@/api/bibType/BibType";
import {GenerateModelForBibType} from "@/api/bibType/GenerateModelForBibTypes";
import {BibEntry} from "../../api/bibEntry/BibEntry";

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
    })

    obj.CompletelyLoaded = true;

    return obj;

}
