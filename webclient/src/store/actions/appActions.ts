import ReadAppData from "@/api/app/AppData";
import MutationTypes from "@/store/MutationTypes";
import {CommitOptions} from "vuex";
import SaveConfig, {ConfigSaveObj} from "@/api/app/SaveConfig";

export async function GetAppData(commit: (type: string,payload?: any,options?: CommitOptions) => void ) {
    const respObj = await ReadAppData();

    if( !respObj.Error ) {
        commit(MutationTypes.App.SetProjectNames, respObj.Projects);
        commit(MutationTypes.App.SetConfig, respObj.Config);
    }
}

export async function SaveConfiguration(commit: (type: string,payload?: any,options?: CommitOptions) => void, obj: ConfigSaveObj ) {
    const success = await SaveConfig(obj);

    if( success ) {
        commit(MutationTypes.App.SetConfig, obj);
        commit(MutationTypes.App.SetSuccessMessage, 'App.SuccessSaveConfig')
    }
}