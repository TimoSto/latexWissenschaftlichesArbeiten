import {MyState} from "@/store/MyState";

export function SetCurrentView(state: MyState, view: string) {
    state.App.CurrentView = view;
}

export function SetProjectNames(state: MyState, projects: string[]) {
    if( !projects ) {
        projects = [];
    }
    state.App.ProjectNames = projects;
}
