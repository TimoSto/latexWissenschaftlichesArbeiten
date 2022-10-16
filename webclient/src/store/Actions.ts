import {MyState} from "@/store/MyState";
import {ActionTree} from "vuex";
import ActionTypes from "@/store/ActionTypes";

import {GetAppData, SaveConfiguration} from "@/store/actions/appActions";
import {ConfigSaveObj} from "@/api/app/SaveConfig";
import {CreateProjectAction} from "@/store/actions/projectsActions";

export const actions: ActionTree<MyState, MyState> = {
    async [ActionTypes.App.GetAppData]({ commit }) {
        await GetAppData(commit)
    },
    async [ActionTypes.App.SaveConfig]({ commit }, payload: ConfigSaveObj) {
        await SaveConfiguration(commit, payload);
    },
    async [ActionTypes.Projects.CreateProject]({ commit }, payload: string) {
        await CreateProjectAction(commit, payload);
    }
}
