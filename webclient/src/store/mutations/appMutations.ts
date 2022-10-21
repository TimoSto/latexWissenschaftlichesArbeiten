import {MyState} from "@/store/MyState";

export function SetCurrentView(state: MyState, view: string) {
    state.App.CurrentView = view;
    state.ProjectView.CurrentProject = '';
}

export function SetProjectNames(state: MyState, projects: string[]) {
    if( !projects ) {
        projects = [];
    }
    state.App.ProjectNames = projects;
}

export function SetConfig(state: MyState, config: { AutoOpenBrowser: boolean, DarkMode: boolean, Port: string }) {
    state.App.Config.AutoOpenBrowser = config.AutoOpenBrowser;
    state.App.Config.DarkMode = config.DarkMode;
    state.App.Config.Port = config.Port;
    state.App.Loaded = true;
}

export function RemoveProject(state: MyState, project: string) {
    const i = state.App.ProjectNames.indexOf(project);
    if( i !== -1 ) {
        state.App.ProjectNames.splice(i, 1);
    }
}
