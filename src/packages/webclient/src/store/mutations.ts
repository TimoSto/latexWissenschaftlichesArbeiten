import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import {state, State} from './state';
import {BibType} from "@/api/bibTypes/BibType";
import {BibEntry} from "@/api/bibEntries/BibEntry";
import router from "@/router";
import {GenerateModelForBibType} from "@/api/bibTypes/GenerateModelForBibTypes";
import {getters} from "@/store/getters";
import Field from "../../../gui/scripts/Field";
import GeneratePreviewsForBibEntry from "@/api/bibEntries/GeneratePreviewsForBibEntry";
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
            state.entryToEdit = <BibEntry>{};
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
    },
    [MutationTypes.NEW_TYPE](state){
        state.typeToEdit = <BibType>{
            Name: '',
            Fields: <Field[]>[],
            CiteFields: <Field[]>[],
        }
    },
    [MutationTypes.CLEANUP_FIELDS](state){
        const bibToRm = <number[]>[]
        state.typeToEdit.Fields.forEach((field, i) => {
           if( field.Field.length === 0 ) {
               bibToRm.push(i);
           }
        });
        for( let i = 0 ; i < bibToRm.length ;  i++ ) {
            state.typeToEdit.Fields.splice(bibToRm[i]-i, 1);
        }

        const citeToRm = <number[]>[]
        state.typeToEdit.CiteFields.forEach((field, i) => {
            if( field.Field.length === 0 ) {
                citeToRm.push(i);
            }
        });
        for( let i = 0 ; i < citeToRm.length ;  i++ ) {
            state.typeToEdit.CiteFields.splice(citeToRm[i]-i, 1);
        }
    },
    [MutationTypes.TOGGLE_TWO_THIRDS](state){
        state.twoThirdsActive = !state.twoThirdsActive;
    },
    [MutationTypes.SET_ENTRY_TO_EDIT](state, payload: string) {
        if(payload.length == 0) {
            state.entryToEdit = <BibEntry>{};
        } else {
            state.typeToEdit = <BibType>{};
            state.bibEntries.forEach(bEntry => {
                if( bEntry.Key === payload ) {
                    state.entryToEdit = JSON.parse(JSON.stringify(bEntry));
                    state.initialEntry = JSON.parse(JSON.stringify(bEntry));
                    state.initialEntry.BibPreview = '';
                    state.initialEntry.CitePreview = '';
                }
            });
        }

    },
    [MutationTypes.UPDATE_PREVIEW](state, payload: string) {
        state.bibTypes.forEach(bType => {
            if( bType.Name === state.entryToEdit.Typ ) {
                const arr = GeneratePreviewsForBibEntry(bType.Fields, bType.CiteFields, state.entryToEdit.Fields);
                state.entryToEdit.BibPreview = arr [0];
                state.entryToEdit.CitePreview = arr [1];
            }
        })

    },
    [MutationTypes.NEW_ENTRY](state){
        state.entryToEdit = <BibEntry>{
            Key: '',
            Typ: '',
            Fields: <string[]>[],
            BibPreview: '',
            CitePreview: '',
            CiteNumber: 0
        }
        state.initialEntry = <BibEntry>{
            Key: '',
            Typ: '',
            Fields: <string[]>[],
            BibPreview: '',
            CitePreview: '',
            CiteNumber: 0
        }
    },
};