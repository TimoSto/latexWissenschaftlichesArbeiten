import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import {state, State} from './state';
import {BibType} from "@/api/bibTypes/BibType";
import {BibEntry} from "@/api/bibEntries/BibEntry";
import router from "@/router";
import {GenerateModelForBibType} from "@/api/bibTypes/GenerateModelForBibTypes";
import {getters} from "@/store/getters";
import Field from "../../../gui/scripts/Field";
export type Mutations<S = State> = {
    [MutationTypes.SET_PROJECT](state: S, payload: string): void;
    [MutationTypes.SET_PROJECTS](state: S, payload: string[]): void;
};

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_PROJECT](state, payload: string) {
        state.project = payload
        state.typeToEdit = <BibType>{}
    },
    [MutationTypes.SET_PROJECTS](state, payload: string[]) {
        state.projects = payload
    },
    [MutationTypes.SET_BIBTYPES](state, payload: BibType[]) {
        state.bibTypes = payload
    },
    [MutationTypes.SET_BIBENTRIES](state, payload: BibEntry[]) {
        state.bibEntries = payload
    },
    [MutationTypes.UPDATE_MODEL_FOR_TYPE](state) {
        state.typeToEdit.Model = GenerateModelForBibType(state.typeToEdit.Fields);
    },
    [MutationTypes.UPDATE_CITE_MODEL_FOR_TYPE](state) {
        state.typeToEdit.CiteModel = GenerateModelForBibType(state.typeToEdit.CiteFields);
    },
    [MutationTypes.SET_TYPE_TO_EDIT](state, payload: string) {
        if(payload.length == 0) {
            state.typeToEdit = <BibType>{}
        } else {
            state.bibTypes.forEach(bType => {
                if( bType.Name === payload ) {
                    state.typeToEdit = JSON.parse(JSON.stringify(bType));
                    state.initialType = JSON.parse(JSON.stringify(bType));
                }
            });
        }

    },
    [MutationTypes.RM_BIB_ATTR](state, payload: number) {
        state.typeToEdit.Fields.splice(payload, 1)
    },
    [MutationTypes.RM_CITE_ATTR](state, payload: number) {
        state.typeToEdit.CiteFields.splice(payload, 1)
    },
    [MutationTypes.ADD_BIB_ATTR](state) {
        state.typeToEdit.Fields.push(<Field>{
            Field: '',
            Style: 'normal',
            Prefix: '',
            Suffix: ''
        });
    },
    [MutationTypes.ADD_CITE_ATTR](state) {
        state.typeToEdit.CiteFields.push(<Field>{
            Field: '',
            Style: 'normal',
            Prefix: '',
            Suffix: ''
        });
    }
};