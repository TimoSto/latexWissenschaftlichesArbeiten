<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left elevation="0" fixed scroll-target="main">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>ThesorTeX</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          icon
          :to="'/'"
          title="Startseite">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn
          icon
          @click="toggleDark"
          title="Design wechseln">
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" permanent :mini-variant="drawer" clipped>
      <v-app-bar elevation="0" color="background">
        <v-toolbar-title v-if="!drawer">Projekte</v-toolbar-title>
        <v-spacer v-if="!drawer"></v-spacer>
        <v-btn icon :to="'/new'" title="Neues Projekt erstellen">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-app-bar>
      <v-list>
        <v-list-item v-for="proj in projects" :key="proj" :to="'/project/'+proj">
          <v-list-item-title v-text="proj"></v-list-item-title>
<!--          <v-list-item-action>-->
<!--            <v-btn icon @click="deleteProject(proj)">-->
<!--              <v-icon color="grey lighten-1">mdi-delete</v-icon>-->
<!--            </v-btn>-->
<!--          </v-list-item-action>-->
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main fill-height id="main" pt-0>
      <v-content>
        <router-view />
      </v-content>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {ActionTypes} from "@/store/action-types";

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
    document.documentElement.setAttribute('lang', 'de');

    this.$store.dispatch('GET_PROJECTS');
  },
  computed: {
    projects: function (): string[] {
      return this.$vStore.state.projects;
    },
    dark(): boolean {
      return this.$vuetify.theme.dark;
    },
  },
  watch: {
    dark(isDark) {
      if( isDark ) {
        document.head.insertAdjacentHTML('beforeend',`<style id="dark">:root{color-scheme: dark;}</style>`)
      } else {
        document.getElementById('dark')?.remove();
      }
    }
  }
});
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">

html {
  overflow: hidden;
}
main.v-content {
  width: 100vw;
  max-height: calc(100vh - 64px);
  flex-direction: column;
  overflow-y: auto;
  padding: 0 !important;
  margin: 0;
}

.hidden{
  display: none;
}
</style>
<style>
.theme--light.v-text-field.v-input--is-disabled .v-input__slot::before,
.theme--dark.v-text-field.v-input--is-disabled .v-input__slot::before{
  border-image: none!important;
}
</style>
