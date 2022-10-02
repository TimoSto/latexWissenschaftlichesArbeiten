import { ActionTree, ActionContext } from 'vuex';
import {myState, MyState} from './state';
import { Mutations } from './mutations';
import { ActionTypes } from "@/store/action-types";
import {MutationTypes} from "@/store/mutation-types";
import GetProjects from "@/api/app/GetProjects";
import CreateProject from "@/api/app/CreateProject";
import router from "@/router";
import DeleteProject from "@/api/project/DeleteProject";
import BackupProject from "@/api/project/BackupProject";
import GetBackupPaths from "@/api/project/GetBackupPaths";
import ResetToBackup from "@/api/project/ResetToBackup";
import GetProjectData from "@/api/project/GetProjectData";

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

    async [ActionTypes.APP_CREATE_PROJECT]({commit, dispatch}, payload: string) {
        const success = await CreateProject(payload)

        if( success ) {
            dispatch(ActionTypes.APP_GET_PROJECTS);
            commit(MutationTypes.APP_SET_PROJECTNAME, payload)
            commit(MutationTypes.APP_SET_SUCCESS, "PROJECT_CREATED")
            await router.push('/project/' + payload)
        } else {
            commit(MutationTypes.APP_SET_ERROR, {type: 'SERVER_CALL', message: 'ERROR_PROJECT_CREATE'})
        }
    },

    async [ActionTypes.PROJECT_DELETE_PROJECT]({ commit, dispatch }, payload: string) {

        const success = await DeleteProject(payload);

        if( success ) {
            dispatch(ActionTypes.APP_GET_PROJECTS);
            commit(MutationTypes.APP_SET_SUCCESS, "SUCCESS_PROJECT_DELETED")
            commit(MutationTypes.APP_SET_PROJECTNAME, '')
            await router.push('/')
        } else {
            commit(MutationTypes.APP_SET_ERROR, {type: 'SERVER_CALL', message: 'ERROR_PROJECT_DELETE'})
        }//TODO: automatisch alles leeren wenn name auf leer gesetzt wird
    },

    async [ActionTypes.PROJECT_BACKUP_PROJECT]({ commit, dispatch }, payload: string) {

        const msg = await BackupProject(payload);

        if( msg.length > 0 ) {
            commit(MutationTypes.APP_SET_SUCCESS, "SUCCESS_PROJECT_BACKUP%"+ msg)
        } else {
            commit(MutationTypes.APP_SET_ERROR, {type: 'SERVER_CALL', message: 'ERROR_PROJECT_BACKUP'})
        }
    },

    async [ActionTypes.PROJECT_GET_BACKUP_PATHS]({ commit, dispatch }, payload: string) {

        const resp = await GetBackupPaths(payload);

        console.log(resp)

        if( resp.success ) {
            commit(MutationTypes.PROJECT_SET_BACKUP_PATHS, resp.paths)
        } else {
            commit(MutationTypes.APP_SET_ERROR, {type: 'SERVER_CALL', message: 'ERROR_GET_PROJECT_BACKUPS'})
        }
    },

    async [ActionTypes.PROJECT_RESET_TO_BACKUP]({ commit, dispatch }, payload: {project: string, backup: string}) {

        const success = await ResetToBackup(payload.project, payload.backup);

        if( success ) {
            commit(MutationTypes.APP_SET_SUCCESS, "SUCCESS_PROJECT_RESET")
        } else {
            commit(MutationTypes.APP_SET_ERROR, {type: 'SERVER_CALL', message: 'ERROR_PROJECT_DELETE'})
        }//TODO: automatisch alles leeren wenn name auf leer gesetzt wird
    },

    async [ActionTypes.PROJECT_GET_PROJECT_DATA]({ commit, dispatch }, payload: string) {

        const obj = await GetProjectData(payload);

        if( obj.CompletelyLoaded ) {
            commit(MutationTypes.PROJECT_SET_PROJECT_DATA, obj)
        } else {
            commit(MutationTypes.APP_SET_ERROR, {type: 'SERVER_CALL', message: 'ERROR_GET_PROJECT_DATA'})
        }
    },
};