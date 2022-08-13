<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>TeX-Thesor</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleDark"><v-icon>mdi-brightness-6</v-icon></v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" permanent :mini-variant.sync="drawer" clipped>

    </v-navigation-drawer>

    <v-main>
      Hallo
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    drawer: false
  }),
  methods: {
    toggleDark () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  },
  created() {
    // Setting Language in the HTML document
    document.documentElement.setAttribute('lang', 'de')
  }
});
</script>
<style lang="scss">
html {
  overflow-y: auto;
}
</style>
