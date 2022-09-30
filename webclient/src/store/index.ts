import Vue, {PluginObject} from 'vue'
import Vuex from 'vuex'
import {myState} from "@/store/state";
import {mutations} from "@/store/mutations";
import {actions} from "@/store/actions";

Vue.use(Vuex)

export default new Vuex.Store({
  state: myState,
  getters: {
  },
  mutations: mutations,
  actions: actions,
  modules: {
  }
})

export const TypedStorePlugin: PluginObject<void> = {
  install(VueInstance: typeof Vue) {
    Object.defineProperty(VueInstance.prototype, '$texStore', {
      get() {
        return this.$store;
      }
    });
  }
};