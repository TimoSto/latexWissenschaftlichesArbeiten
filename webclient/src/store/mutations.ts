import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import {MyState} from './state';
import {ProjectData} from "@/api/project/GetProjectData";
import {BibEntry} from "@/api/bibEntry/BibEntry";
import {BibType} from "@/api/bibType/BibType";

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
        })
    },
    [MutationTypes.EDITOR_OPEN](state, payload: {Type: string, Key: string}) {
        state.editor.type = payload.Type;
        state.editor.key = payload.Key;
        if( payload.Type === 'bibType' ) {
            state.editor.entryToEdit = <BibEntry>{};
            for( let i = 0; i < state.project.bibTypes.length ; i++ ) {
                if( state.project.bibTypes[i].Name === payload.Key ) {
                    state.editor.typeToEdit = JSON.parse(JSON.stringify(state.project.bibTypes[i]));
                    break;
                }
            }
        } else if( payload.Type === 'bibEntry' ) {
            state.editor.typeToEdit = <BibType>{};
            for( let i = 0; i < state.project.bibEntries.length ; i++ ) {
                if( state.project.bibEntries[i].Key === payload.Key ) {
                    state.editor.entryToEdit = JSON.parse(JSON.stringify(state.project.bibEntries[i]));
                    break;
                }
            }
        }
    }
};