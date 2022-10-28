import {CommitOptions, DispatchOptions} from "vuex";
import CreateProject from "@/api/projects/CreateProject";
import MutationTypes from "@/store/MutationTypes";
import GetProjectData from "@/api/projects/GetProjectData";
import DeleteProject from "@/api/projects/DeleteProject";
import {DeleteType} from "@/api/bibTypes/DeleteType";
import {BibType} from "@/api/bibTypes/BibType";
import SaveType from "@/api/bibTypes/SaveType";
import {BibEntry} from "@/api/bibEntries/Entry";
import SaveEntry from "@/api/bibEntries/SaveEntry";
import DeleteEntry from "@/api/bibEntries/DeleteEntry";
import {i18nDictionary} from "@/i18n/Keys";
import UploadEntries from "@/api/bibEntries/UploadEntries";
import CreateBackup from "@/api/projects/CreateBackup";
import ResetToBackup from "@/api/projects/ResetToBackup";
import ActionTypes from "@/store/ActionTypes";

export async function CreateProjectAction(commit: (type: string,payload?: any,options?: CommitOptions) => void, name: string ) {
    const success = await CreateProject(name);

    if( success ) {
        commit(MutationTypes.ProjectView.AddProject, name);
        commit(MutationTypes.ProjectView.SetCurrentProject, name);
        commit(MutationTypes.App.SetSuccessMessage, i18nDictionary.Projects.New.Success)
    }
}

export async function GetProjectDataAction(commit: (type: string,payload?: any,options?: CommitOptions) => void, project: string ) {
    const obj = await GetProjectData(project);

    if( obj.CompletelyLoaded ) {
        commit(MutationTypes.ProjectView.SetCurrentProjectData, obj);
    }
}

export async function DeleteProjectAction(commit: (type: string,payload?: any,options?: CommitOptions) => void, project: string ) {
    const ok = await DeleteProject(project);

    if( ok ) {
        commit(MutationTypes.ProjectView.SetCurrentProject, '');
        commit(MutationTypes.App.RemoveProject, project);
        commit(MutationTypes.App.SetSuccessMessage, i18nDictionary.Projects.Overview.DeleteProjectDialog.Success)
    }
}

export async function DeleteTypeAction(commit: (type: string,payload?: any,options?: CommitOptions) => void, project: string, type: string) {
    const ok = await DeleteType(type, project)

    if( ok ) {
        commit(MutationTypes.CategoryEditor.RemoveType, type);
        commit(MutationTypes.ProjectView.EditorCloseNeeded, true);
        commit(MutationTypes.App.SetSuccessMessage, i18nDictionary.Projects.CategoryEditor.DeleteCategoryDialog.Success)
    }
}

export async function SaveTypeAction(commit: (type: string,payload?: any,options?: CommitOptions) => void, project: string, type: BibType, initialName: string) {
    const ok = await SaveType(type, project, initialName)

    if( ok ) {
        commit(MutationTypes.CategoryEditor.UpdateType, {Type: type, initialName: initialName})
        commit(MutationTypes.ProjectView.SetEditorUpdateIndex, {v: type.Name, entry: false});
        commit(MutationTypes.App.SetSuccessMessage, i18nDictionary.Projects.CategoryEditor.Success)
    }
}

export async function SaveEntryAction(commit: (type: string,payload?: any,options?: CommitOptions) => void, project: string, entry: BibEntry, initialKey: string) {
    const ok = await SaveEntry(project, entry, initialKey)

    if( ok ) {
        commit(MutationTypes.EntryEditor.UpdateEntry, {Entry: entry, initialKey: initialKey})
        commit(MutationTypes.ProjectView.SetEditorUpdateIndex, {v: entry.Key, entry: true});
        commit(MutationTypes.App.SetSuccessMessage, i18nDictionary.Projects.EntryEditor.Success)
    }
}

export async function DeleteEntryAction(commit: (type: string,payload?: any,options?: CommitOptions) => void, project: string, key: string) {
    const ok = await DeleteEntry(project, key)

    if( ok ) {
        commit(MutationTypes.EntryEditor.RemoveEntry, key);
        commit(MutationTypes.ProjectView.EditorCloseNeeded, true);
        commit(MutationTypes.App.SetSuccessMessage, i18nDictionary.Projects.EntryEditor.DeleteEntryDialog.Success)
    }
}

export async function UploadEntriesAction(commit: (type: string,payload?: any,options?: CommitOptions) => void, project: string, entries: BibEntry[], override: boolean) {
    const ok = await UploadEntries(project, entries, override);

    if( ok ) {
        entries.forEach(e => {
            commit(MutationTypes.EntryEditor.UpdateEntry, {Entry: e, initialKey: e.Key})
        });
        commit(MutationTypes.App.SetSuccessMessage, i18nDictionary.Projects.Overview.UploadDialog.Success)
    }
}

export async function CreateBackupAction(commit: (type: string,payload?: any,options?: CommitOptions) => void, project: string) {
    const resp = await CreateBackup(project)

    if( resp.ok ) {
        const path = await resp.text()
        const backup = path.split('/').pop();
        commit(MutationTypes.ProjectView.AddBackup, backup)
        commit(MutationTypes.App.SetSuccessMessage, i18nDictionary.Projects.Overview.CreateBackupSuccess)
    }
}

export async function ResetToBackupAction(commit: (type: string,payload?: any,options?: CommitOptions) => void, dispatch: (type: string,payload?: any,options?: DispatchOptions) => void, project: string, backup: string) {
    const ok = await ResetToBackup(project, backup)

    if( ok ) {
        dispatch(ActionTypes.Projects.GetProjectData, project)
        commit(MutationTypes.App.SetSuccessMessage, i18nDictionary.Projects.Overview.ResetDialog.Success)
    }
}
