import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true
        },
        themes: {
            light: {
                primary: '#1976D2',
                secondary: '#333E48',
                accent: colors.shades.black,
                error: '#b00020',
                background: '#FFFFFF'
            },
            dark: {
                primary: '#1a679c',
                secondary: '#8D9BA8',
                accent: colors.shades.white,
                error: '#CF6679',
                background: '#333333'
            }
        },
    },
    icons: {
        iconfont: 'mdi',
    },
});
