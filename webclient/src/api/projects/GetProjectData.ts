import {BibType} from "@/api/bibTypes/BibType";
import {BibEntry} from "@/api/bibEntries/Entry";
import {Abbreviation} from "@/api/abbreviations/Abbreviation";

export interface ProjectData {
    BibTypes: BibType[],
    BibEntries: BibEntry[],
    Abbreviations: Abbreviation[],
    BackupPaths: string[],
    CompletelyLoaded: boolean
}

export default async function GetProjectData(project: string): Promise<ProjectData> {
    const resp = await fetch(`/getProjectData?project=${project}`)

    if( !resp.ok ) {
        return {
            BibTypes: [],
            BibEntries: [],
            Abbreviations: [],
            BackupPaths: [],
            CompletelyLoaded: false
        }
    }

    const obj = await resp.json() as ProjectData
    obj.CompletelyLoaded = true;

    return obj
}
