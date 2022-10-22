import {CommitOptions} from "vuex";
import CreateProject from "@/api/projects/CreateProject";
import MutationTypes from "@/store/MutationTypes";
import GetProjectData from "@/api/projects/GetProjectData";
import DeleteProject from "@/api/projects/DeleteProject";
import {DeleteType} from "@/api/bibTypes/DeleteType";
import {BibType} from "@/api/bibTypes/BibType";
import SaveType from "@/api/bibTypes/SaveType";

export async function CreateProjectAction(commit: (type: string,payload?: any,options?: CommitOptions) => void, name: string ) {
    const success = await CreateProject(name);

    if( success ) {
        commit(MutationTypes.ProjectView.AddProject, name);
        commit(MutationTypes.ProjectView.SetCurrentProject, name);
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
    }
}

export async function DeleteTypeAction(commit: (type: string,payload?: any,options?: CommitOptions) => void, project: string, type: string) {
    const ok = await DeleteType(type, project)

    if( ok ) {
        commit(MutationTypes.CategoryEditor.RemoveType, type);
        commit(MutationTypes.ProjectView.EditorCloseNeeded, true);
    }
}

export async function SaveTypeAction(commit: (type: string,payload?: any,options?: CommitOptions) => void, project: string, type: BibType, initialName: string) {
    const ok = await SaveType(type, project, initialName)


}
