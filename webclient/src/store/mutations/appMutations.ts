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

export function SetConfig(state: MyState, config: { AutoOpenBrowser: boolean, DarkMode: boolean, Port: string }) {
    state.App.Config.AutoOpenBrowser = config.AutoOpenBrowser;
    state.App.Config.DarkMode = config.DarkMode;
    state.App.Config.Port = config.Port;
}
