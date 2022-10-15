import {MyState} from "@/store/MyState";

export function SetCurrentProject(state: MyState, project: string) {
    state.ProjectView.CurrentProject = project;
}