import Vue from 'vue'
import Vuex from 'vuex'
import {MyStateObj} from "@/store/MyState";
import {mutations} from "@/store/Mutations";

Vue.use(Vuex)

export default new Vuex.Store({
  state: MyStateObj,
  getters: {
  },
  mutations: mutations,
  actions: {
  },
  modules: {
  }
})
