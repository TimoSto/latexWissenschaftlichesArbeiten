import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import {MyState} from './state';
import {ProjectData} from "@/api/project/GetProjectData";
import {BibEntry} from "@/api/bibEntry/BibEntry";
import {BibType, CreateField} from "@/api/bibType/BibType";
import {GenerateModelForBibType} from "@/api/bibType/GenerateModelForBibTypes";
import Vue from "vue";

export type Mutations<S = MyState> = {
    [MutationTypes.APP_SET_PROJECTNAMES](state: S, payload: string[]): void;
};

export const mutations: MutationTree<MyState> & Mutations = {
    [MutationTypes.APP_SET_PROJECTNAMES](state, payload: string[]) {
        state.app.projectNames = payload
    },
    [MutationTypes.APP_SET_PROJECTNAME](state, payload: string) {
        state.app.currentProjectName = payload
    },
    [MutationTypes.APP_SET_ERROR](state, payload: {type: string, message: string}) {
        state.app.error = payload
    },
    [MutationTypes.APP_TOGGLE_TWO_THIRDS](state) {
        state.app.twoThirdsActive = !state.app.twoThirdsActive;
    },
    [MutationTypes.APP_SET_SUCCESS](state, payload: string) {
        state.app.successMessage = payload
        if( payload === 'SUCCESS_PROJECT_DELETED' ) {
            state.app.deletedProject = state.app.currentProjectName
        }
    },
    [MutationTypes.PROJECT_SET_BACKUP_PATHS](state, payload: string[]) {
        state.project.backupPaths = payload
    },
    [MutationTypes.PROJECT_SET_PROJECT_DATA](state, payload: ProjectData) {
        state.project.bibEntries = payload.BibEntries
        state.project.bibTypes = payload.BibTypes
        state.project.bibTypes.forEach(t => {
            if( !t.CitaviNecessaryFields ) {
                t.CitaviNecessaryFields = [];
            }
            t.Fields.forEach(f => {
                if( !f.CitaviAttributes ) {
                    f.CitaviAttributes = []
                }
            })
            t.CiteFields.forEach(f => {
                if( !f.CitaviAttributes ) {
                    f.CitaviAttributes = []
                }
            })
        })
    },
    [MutationTypes.EDITOR_OPEN](state, payload: {Type: string, Key: string}) {
        state.editor.type = payload.Type;
        state.editor.key = payload.Key;
        if( payload.Type === 'bibType' ) {
            state.editor.indexOfEdited = state.project.bibTypes.map(t => t.Name).indexOf(payload.Key)
            // state.editor.entryToEdit = <BibEntry>{};
            // for( let i = 0; i < state.project.bibTypes.length ; i++ ) {
            //     if( state.project.bibTypes[i].Name === payload.Key ) {
            //         state.editor.typeToEdit = JSON.parse(JSON.stringify(state.project.bibTypes[i]));
            //         break;
            //     }
            // }
        } else if( payload.Type === 'bibEntry' ) {
            state.editor.indexOfEdited = state.project.bibEntries.map(e => e.Key).indexOf(payload.Key)
            // state.editor.typeToEdit = <BibType>{};
            // for( let i = 0; i < state.project.bibEntries.length ; i++ ) {
            //     if( state.project.bibEntries[i].Key === payload.Key ) {
            //         state.editor.entryToEdit = JSON.parse(JSON.stringify(state.project.bibEntries[i]));
            //         break;
            //     }
            // }
        } else {
            state.editor.indexOfEdited = -1;
        }
    },
    [MutationTypes.PROJECT_UPDATE_TYPE_TO_EDIT](state, payload: BibType) {
        state.editor.key = payload.Name;

        state.project.bibTypes[state.editor.indexOfEdited].Name = payload.Name;
        state.project.bibTypes[state.editor.indexOfEdited].CitaviType = payload.CitaviType;
        state.project.bibTypes[state.editor.indexOfEdited].CitaviNecessaryFields = payload.CitaviNecessaryFields;
        state.project.bibTypes[state.editor.indexOfEdited].Fields = payload.Fields;
        state.project.bibTypes[state.editor.indexOfEdited].CiteFields = payload.CiteFields;
        state.project.bibTypes[state.editor.indexOfEdited].Model = payload.Model;
        state.project.bibTypes[state.editor.indexOfEdited].CiteModel = payload.CiteModel;
    },
    [MutationTypes.EDITOR_SET_SAVELY_CLOSABLE](state, payload: boolean) {
        state.editor.savelyClosable = payload;
    }
};