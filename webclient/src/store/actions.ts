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
import {BibType, BibTypeSaveObj} from "@/api/bibType/BibType";
import SaveType from "@/api/bibType/SaveBibType";
import SaveBibEntry, {BibEntrySaveObj} from "@/api/bibEntry/SaveBibEntry";
import DeleteEntry from "@/api/bibEntry/DeleteEntry";
import DeleteType from "@/api/bibType/DeleteType";
import CleanupCites from "@/api/project/CleanupCites";
import SetDefault from "@/api/project/SetDefault";
import ResetDefaultTypes from "@/api/project/ResetDefaultTypes";

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
            commit(MutationTypes.EDITOR_OPEN, {Type: '', Key: ''})
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
            dispatch(ActionTypes.PROJECT_GET_PROJECT_DATA, payload.project);
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

    async [ActionTypes.EDITOR_SAVE_TYPE]({ commit }, payload: BibTypeSaveObj) {

        const resp = await SaveType(payload);

        if(resp.ok) {
            commit(MutationTypes.APP_SET_SUCCESS, 'SUCCESS_TYPE_SAVE');
            commit(MutationTypes.PROJECT_UPDATE_TYPE_TO_EDIT, payload.Type)
        }//TODO: Error-Handling
    },

    async [ActionTypes.EDITOR_SAVE_ENTRY]({ commit }, payload: BibEntrySaveObj) {

        const resp = await SaveBibEntry(payload);

        if(resp.ok) {
            commit(MutationTypes.APP_SET_SUCCESS, 'SUCCESS_ENTRY_SAVE');
            commit(MutationTypes.PROJECT_UPDATE_ENTRY_TO_EDIT, payload.Entry)
        }
    },

    async [ActionTypes.EDITOR_DELETE_ENTRY]({commit}, payload: {Project: string, Key: string}) {

        const ok = await DeleteEntry(payload.Project, payload.Key)

        if( ok) {
            commit(MutationTypes.APP_SET_SUCCESS, 'SUCCESS_ENTRY_DELETE');
            commit(MutationTypes.EDITOR_OPEN, {Type: '', Key: ''});
            commit(MutationTypes.PROJECT_RM_ENTRY, payload.Key);
        }
    },

    async [ActionTypes.EDITOR_DELETE_TYPE]({commit}, payload: {Project: string, Key: string}) {

        const ok = await DeleteType(payload.Project, payload.Key)

        if( ok) {
            commit(MutationTypes.APP_SET_SUCCESS, 'SUCCESS_TYPE_DELETE');
            commit(MutationTypes.EDITOR_OPEN, {Type: '', Key: ''});
            commit(MutationTypes.PROJECT_RM_TYPE, payload.Key);
        }
    },

    async [ActionTypes.PROJECT_CLEANUP_CITES]({commit}, payload: string) {
        const resp = await CleanupCites(payload);

        if( resp.ok ) {
            commit(MutationTypes.APP_SET_SUCCESS, 'SUCCESS_CLEANUP_CITES');
        }
    },

    async [ActionTypes.PROJECT_SET_AS_DEFAULT]({commit}, payload: string) {
        const resp = await SetDefault(payload);

        if( resp.ok ) {
            commit(MutationTypes.APP_SET_SUCCESS, 'SUCCESS_SET_DEFAULT');
        }
    },

    async [ActionTypes.PROJECT_RESET_TO_DEFAULT]({commit}, payload: string) {
        const resp = await ResetDefaultTypes(payload);

        if( resp.ok ) {
            commit(MutationTypes.APP_SET_SUCCESS, 'SUCCESS_RESET_TO_DEFAULT');
        }
    }
};