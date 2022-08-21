import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import { State } from './state';
import {BibType} from "@/api/bibTypes/BibType";
export type Mutations<S = State> = {
    [MutationTypes.SET_PROJECT](state: S, payload: string): void;
    [MutationTypes.SET_PROJECTS](state: S, payload: string[]): void;
};

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_PROJECT](state, payload: string) {
        state.project = payload
    },
    [MutationTypes.SET_PROJECTS](state, payload: string[]) {
        state.projects = payload
    },
    [MutationTypes.SET_BIBTYPES](state, payload: BibType[]) {
        console.log(payload)
        state.bibTypes = payload
    },
    [MutationTypes.SET_BIBENTRIES](state, payload: BibType[]) {
        console.log(payload)
        state.bibEntries = payload
    },
};