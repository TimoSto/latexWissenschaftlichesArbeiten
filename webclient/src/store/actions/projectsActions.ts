import {CommitOptions} from "vuex";
import CreateProject from "@/api/projects/CreateProject";
import MutationTypes from "@/store/MutationTypes";

export async function CreateProjectAction(commit: (type: string,payload?: any,options?: CommitOptions) => void, name: string ) {
    const success = await CreateProject(name);

    if( success ) {
        commit(MutationTypes.ProjectView.AddProject, name);
        commit(MutationTypes.ProjectView.SetCurrentProject, name);
    }
}