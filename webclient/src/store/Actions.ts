import {MyState} from "@/store/MyState";
import {ActionTree} from "vuex";
import ActionTypes from "@/store/ActionTypes";

import {GetAppData, SaveConfiguration} from "@/store/actions/appActions";
import {ConfigSaveObj} from "@/api/app/SaveConfig";
import {
    CreateBackupAction,
    CreateProjectAction, DeleteEntryAction,
    DeleteProjectAction,
    DeleteTypeAction,
    GetProjectDataAction, ResetToBackupAction, SaveEntryAction, SaveTypeAction, UploadEntriesAction
} from "@/store/actions/projectsActions";
import {BibType} from "@/api/bibTypes/BibType";
import {BibEntry} from "@/api/bibEntries/Entry";
import CreateBackup from "@/api/projects/CreateBackup";
import ResetToBackup from "@/api/projects/ResetToBackup";

export const actions: ActionTree<MyState, MyState> = {
    async [ActionTypes.App.GetAppData]({ commit }) {
        await GetAppData(commit)
    },
    async [ActionTypes.App.SaveConfig]({ commit }, payload: ConfigSaveObj) {
        await SaveConfiguration(commit, payload);
    },
    async [ActionTypes.Projects.CreateProject]({ commit }, payload: string) {
        await CreateProjectAction(commit, payload);
    },
    async [ActionTypes.Projects.GetProjectData]({ commit }, payload: string) {
        await GetProjectDataAction(commit, payload);
    },
    async [ActionTypes.Projects.DeleteProject]({ commit }, payload: string) {
        await DeleteProjectAction(commit, payload);
    },
    async [ActionTypes.Projects.CategoryEditor.DeleteCategory]({ commit }, payload: {type: string, project: string}) {
        await DeleteTypeAction(commit, payload.project, payload.type)
    },
    async [ActionTypes.Projects.CategoryEditor.SaveCategory]({ commit }, payload: {type: BibType, project: string, initialName: string}) {
        await SaveTypeAction(commit, payload.project, payload.type, payload.initialName)
    },
    async [ActionTypes.Projects.EntryEditor.SaveEntry]({ commit }, payload: {entry: BibEntry, project: string, initialKey: string}) {
        await SaveEntryAction(commit, payload.project, payload.entry, payload.initialKey)
    },
    async [ActionTypes.Projects.EntryEditor.DeleteEntry]({ commit }, payload: {project: string, entry: string}) {
        await DeleteEntryAction(commit, payload.project, payload.entry)
    },
    async [ActionTypes.Projects.Overview.UploadEntries]({commit}, payload: {project: string, entries: BibEntry[], override: boolean}) {
        await UploadEntriesAction(commit, payload.project, payload.entries, payload.override);
    },
    async [ActionTypes.Projects.Overview.CreateBackup]({commit}, payload: string) {
        await CreateBackupAction(commit, payload);
    },
    async [ActionTypes.Projects.Overview.ResetToBackup]({commit, dispatch}, payload: {project: string, backup: string}) {
        await ResetToBackupAction(commit, dispatch, payload.project, payload.backup);
    }
}
