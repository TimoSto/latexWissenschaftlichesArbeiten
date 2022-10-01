import Vue from 'vue'
import VueI18n from "vue-i18n";
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import {GermanTranslations} from "@/i18n/German";
import {EnglishTranslations} from "@/i18n/English";
import i18n from "@/i18n";

Vue.config.productionTip = false

const translations = {
  de: GermanTranslations,
  en: EnglishTranslations
}

new Vue({
  router,
  i18n,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
