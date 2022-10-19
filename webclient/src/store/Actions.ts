import {MyState} from "@/store/MyState";
import {ActionTree} from "vuex";
import ActionTypes from "@/store/ActionTypes";

import {GetAppData, SaveConfiguration} from "@/store/actions/appActions";
import {ConfigSaveObj} from "@/api/app/SaveConfig";
import {CreateProjectAction, DeleteProjectAction, GetProjectDataAction} from "@/store/actions/projectsActions";

export const actions: ActionTree<MyState, MyState> = {
    async [ActionTypes.App.GetAppData]({ commit }) {
        await GetAppData(commit)
    },
    async [ActionTypes.App.SaveConfig]({ commit }, payload: ConfigSaveObj) {
        await SaveConfiguration(commit, payload);
    },
    async [ActionTypes.Projects.CreateProject]({ commit }, payload: string) {
        await CreateProjectAction(commit, payload);
    },
    async [ActionTypes.Projects.GetProjectData]({ commit }, payload: string) {
        await GetProjectDataAction(commit, payload);
    },
    async [ActionTypes.Projects.DeleteProject]({ commit }, payload: string) {
        await DeleteProjectAction(commit, payload);
    }
}
