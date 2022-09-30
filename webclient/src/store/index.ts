import Vue, {PluginObject} from 'vue'
import Vuex from 'vuex'
import {myState} from "@/store/myState";

Vue.use(Vuex)

export default new Vuex.Store({
  state: myState,
  getters: {
  },
  mutations: {

  },
  actions: {
  },
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
