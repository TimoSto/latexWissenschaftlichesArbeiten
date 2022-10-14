import {MutationTree} from "vuex";
import {MyState} from "@/store/MyState";
import MutationTypes from "@/store/MutationTypes";

export const mutations: MutationTree<MyState> = {
    [MutationTypes.App.SetCurrentView](state: MyState, payload: string) {
        state.App.CurrentView = payload
    }
}