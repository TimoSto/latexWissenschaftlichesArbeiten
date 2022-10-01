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
    [MutationTypes.APP_SET_PROJECTNAME](state, payload: string) {
        state.app.currentProjectName = payload
    },
    [MutationTypes.APP_SET_ERROR](state, payload: {type: string, message: string}) {
        state.app.error = payload
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
};