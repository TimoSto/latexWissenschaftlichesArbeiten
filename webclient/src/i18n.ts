import Vue from 'vue';
import VueI18n from 'vue-i18n';
import {GermanTranslations} from "@/i18n/German";
import {EnglishTranslations} from "@/i18n/English";

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: window.navigator.language.indexOf('de') >= 0 ? 'de' : 'en',
    fallbackLocale: 'en',
    messages: {
        de: GermanTranslations,
        en: EnglishTranslations
    }
});

export default i18n;
