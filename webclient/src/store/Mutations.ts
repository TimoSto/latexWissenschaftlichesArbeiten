import {MutationTree} from "vuex";
import {MyState} from "@/store/MyState";
import MutationTypes from "@/store/MutationTypes";
import {SetCurrentView} from "@/store/mutations/appMutations";

export const mutations: MutationTree<MyState> = {
    [MutationTypes.App.SetCurrentView](state: MyState, payload: string) {
        SetCurrentView(state, payload);
    }
}