import ReadAppData from "@/api/app/AppData";
import MutationTypes from "@/store/MutationTypes";
import {CommitOptions} from "vuex";

export async function GetAppData(commit: (type: string,payload?: any,options?: CommitOptions) => void ) {
    const respObj = await ReadAppData();

    if( !respObj.Error ) {
        commit(MutationTypes.App.SetProjectNames, respObj.Projects);
        commit(MutationTypes.App.SetConfig, respObj.Config);
    }
}