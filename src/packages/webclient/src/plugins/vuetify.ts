import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#1976D2',
                secondary: '#333E48',
                accent: '#6da6dc',
                error: '#b00020',
            },
            dark: {
                primary: '#1a679c',
                secondary: '#8D9BA8',
                accent: '#3a5770',
                error: '#CF6679'
            }
        },
    },
    icons: {
        iconfont: 'mdi',
    },
});
