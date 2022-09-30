import { ActionTree, ActionContext } from 'vuex';
import {myState, MyState} from './state';
import { Mutations } from './mutations';
import { ActionTypes } from "@/store/action-types";
import {MutationTypes} from "@/store/mutation-types";
import GetProjects from "@/api/app/GetProjects";

export type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<MyState, MyState>, 'commit'>;

export interface Actions {
    [ActionTypes.APP_GET_PROJECTS](
        { commit }: AugmentedActionContext,
        payload: undefined
    ): Promise<void>;
}

export const actions: ActionTree<MyState, MyState> & Actions = {
    async [ActionTypes.APP_GET_PROJECTS]({ commit }) {

        const obj = await GetProjects();

        commit(MutationTypes.APP_SET_PROJECTNAMES, obj)
    },
};