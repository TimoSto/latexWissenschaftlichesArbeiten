import { ActionTree, ActionContext } from 'vuex';
import { State } from './state';
import { Mutations } from './mutations';
import { ActionTypes } from "@/store/action-types";
import {MutationTypes} from "@/store/mutation-types";
import GetProjects from "@/api/projects/GetProjects";
import GetBibTypes from "@/api/bibTypes/GetBibTypes";
import GetBibEntries from "@/api/bibEntries/GetBibEntries";
import CreateProject from "@/api/projects/CreateProject";
import router from "@/router";
import DeleteProject from "@/api/projects/DeleteProject";

export type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
    [ActionTypes.GET_PROJECTS](
        { commit }: AugmentedActionContext,
        payload: undefined
    ): Promise<void>;
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.GET_PROJECTS]({ commit }, payload) {
        // const sessionID = await loginUser(payload.username, payload.password, payload.rememberMe);
        // commit(MutationTypes.SET_SESSION, { id: sessionID, username: payload.username });

        const obj = await GetProjects();

        commit(MutationTypes.SET_PROJECTS, obj)
    },
    async [ActionTypes.GET_BIBTYPES]({ commit }, payload) {
        // const sessionID = await loginUser(payload.username, payload.password, payload.rememberMe);
        // commit(MutationTypes.SET_SESSION, { id: sessionID, username: payload.username });

        const obj = await GetBibTypes(this.state.project);

        commit(MutationTypes.SET_BIBTYPES, obj)
    },
    async [ActionTypes.GET_BIBENTRIES]({ commit }, payload) {
        // const sessionID = await loginUser(payload.username, payload.password, payload.rememberMe);
        // commit(MutationTypes.SET_SESSION, { id: sessionID, username: payload.username });

        const obj = await GetBibEntries(this.state.project);

        commit(MutationTypes.SET_BIBENTRIES, obj)
    },
    async [ActionTypes.CREATE_PROJECT]({ commit, dispatch }, payload) {
        // const sessionID = await loginUser(payload.username, payload.password, payload.rememberMe);
        // commit(MutationTypes.SET_SESSION, { id: sessionID, username: payload.username });

        const success = await CreateProject(payload)

        if( success ) {
            dispatch(ActionTypes.GET_PROJECTS);
            commit(MutationTypes.SET_PROJECT, payload)
            await router.push('/project/' + payload)
        } else {
            //TODO: Errorhandling
        }

    },

    async [ActionTypes.DELETE_PROJECT]({ commit, dispatch }, payload) {
        // const sessionID = await loginUser(payload.username, payload.password, payload.rememberMe);
        // commit(MutationTypes.SET_SESSION, { id: sessionID, username: payload.username });

        const success = await DeleteProject(payload)

        if( success ) {
            dispatch(ActionTypes.GET_PROJECTS);
            await router.push('/')
        }

    },
};