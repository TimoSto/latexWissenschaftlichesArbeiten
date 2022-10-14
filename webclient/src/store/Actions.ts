import {MyState} from "@/store/MyState";
import {ActionTree} from "vuex";
import ActionTypes from "@/store/ActionTypes";

import {GetAppData} from "@/store/actions/appActions";

export const actions: ActionTree<MyState, MyState> = {
    async [ActionTypes.App.GetAppData]({ commit }) {
        await GetAppData(commit)
    }
}
