import {MyState} from "@/store/MyState";
import {ProjectData} from "@/api/projects/GetProjectData";
import {BibType} from "@/api/bibTypes/BibType";
import {GenerateModelFromFields} from "@/api/bibTypes/GenerateModelFromFields";
import {BibEntry} from "@/api/bibEntries/Entry";
import GeneratePreviewsForBibEntry from "@/api/bibEntries/GeneratePreviewsForBibEntry";
import {ParseTeXToString} from "@/api/bibEntries/ParseTeXString";
import ParseEntryToString from "@/api/bibEntries/ParseEntryToString";

export function SetCurrentProject(state: MyState, project: string) {
    state.ProjectView.CurrentProject = project;
}

export function AddProject(state: MyState, project: string) {
    state.App.ProjectNames.push(project);
    state.App.ProjectNames.sort((a,b) => {
        if( a < b ) return -1
        return 0
    })
}

export function SetProjectData(state: MyState, data: ProjectData) {
    data.BibEntries.forEach((e:BibEntry, i: number) => {
        const bType = data.BibTypes.find(t => t.Name === e.Typ);

        if( bType ) {
            data.BibEntries[i] = ParseEntryToString(e, bType);
        }
    })
    state.ProjectView.CurrentProjectData.bibEntries = data.BibEntries;
    data.BibTypes.forEach((t: BibType, i: number) => {
        if( !t.CitaviType || t.CitaviType === '' ) {
            data.BibTypes[i].CitaviType = '/';
        }
        data.BibTypes[i].Model = GenerateModelFromFields(t.Fields)
    })
    state.ProjectView.CurrentProjectData.bibTypes = data.BibTypes;
}
