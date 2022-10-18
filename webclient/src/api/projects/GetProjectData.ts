import {BibType} from "@/api/bibtypes/BibType";
import {BibEntry} from "@/api/bibEntries/Entry";
import {Abbreviation} from "@/api/abbreviations/Abbreviation";

export interface ProjectData {
    BibTypes: BibType[],
    BibEntries: BibEntry[],
    Abbreviations: Abbreviation[],
    CompletelyLoaded: boolean
}

export default async function GetProjectData(project: string): Promise<ProjectData> {
    const resp = await fetch(`/getProjectData?project=${project}`)

    if( !resp.ok ) {
        return {
            BibTypes: [],
            BibEntries: [],
            Abbreviations: [],
            CompletelyLoaded: false
        }
    }

    const obj = await resp.json() as ProjectData
    obj.CompletelyLoaded = true;

    return obj
}
