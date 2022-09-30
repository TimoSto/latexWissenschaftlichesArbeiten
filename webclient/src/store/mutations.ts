import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import {MyState} from './state';

export type Mutations<S = MyState> = {
    [MutationTypes.APP_SET_PROJECTNAMES](state: S, payload: string[]): void;
};

export const mutations: MutationTree<MyState> & Mutations = {
    [MutationTypes.APP_SET_PROJECTNAMES](state, payload: string[]) {
        state.app.projectNames = payload
    },
};