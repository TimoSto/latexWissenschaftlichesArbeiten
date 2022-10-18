import {MyState} from "@/store/MyState";
import {ProjectData} from "@/api/projects/GetProjectData";
import {BibType} from "@/api/bibTypes/BibType";
import {GenerateModelForBibType} from "@/api/bibTypes/GenerateModelForBibTypes";

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
    console.log(data.BibTypes);
    state.ProjectView.CurrentProjectData.bibEntries = data.BibEntries;
    data.BibTypes.forEach((t: BibType, i: number) => {
        if( !t.CitaviType || t.CitaviType === '' ) {
            data.BibTypes[i].CitaviType = '/';
        }
        data.BibTypes[i].Model = GenerateModelForBibType(t.Fields)
    })
    state.ProjectView.CurrentProjectData.bibTypes = data.BibTypes;
}
