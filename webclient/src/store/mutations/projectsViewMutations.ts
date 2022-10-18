import {MyState} from "@/store/MyState";
import {ProjectData} from "@/api/projects/GetProjectData";

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
    state.ProjectView.CurrentProjectData.bibTypes = data.BibTypes;
}
