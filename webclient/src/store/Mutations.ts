import {MutationTree} from "vuex";
import {MyState} from "@/store/MyState";
import MutationTypes from "@/store/MutationTypes";
import {SetConfig, SetCurrentView, SetProjectNames} from "@/store/mutations/appMutations";
import {SetCurrentProject} from "@/store/mutations/projectsViewMutations";

export const mutations: MutationTree<MyState> = {
    [MutationTypes.App.SetCurrentView](state: MyState, payload: string) {
        SetCurrentView(state, payload);
    },
    [MutationTypes.App.SetProjectNames](state: MyState, payload: string[]) {
        SetProjectNames(state, payload);
    },
    [MutationTypes.ProjectView.SetCurrentProject](state: MyState, payload: string) {
        SetCurrentProject(state, payload);
    },
    [MutationTypes.App.SetConfig](state: MyState, payload: { AutoOpenBrowser: boolean, DarkMode: boolean, Port: string }) {
        SetConfig(state, payload);
    },
}