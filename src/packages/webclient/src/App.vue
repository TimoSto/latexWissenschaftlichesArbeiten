<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left elevation="0" fixed scroll-target="main">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>ThesorTeX</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleDark"><v-icon>mdi-brightness-6</v-icon></v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" permanent :mini-variant="drawer" clipped>
      <v-list>
        <v-list-item v-for="proj in projects" :key="proj" :to="'/project/'+proj">
          <v-list-item-title v-text="proj"></v-list-item-title>
          <v-list-item-action>
            <v-btn icon @click="deleteProject(proj)">
              <v-icon color="grey lighten-1">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
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

export default Vue.extend({
  name: 'App',

  data: () => ({
    drawer: false
  }),
  methods: {
    toggleDark () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    switchProject(proj: string, e: Event) {
      if( (e.target as HTMLElement).tagName !== 'I' ) {
        console.log('switchTo', proj)
      }
    },
    deleteProject(proj: string) {
      console.log('del', proj)
    }
  },
  created() {
    // Setting Language in the HTML document
    document.documentElement.setAttribute('lang', 'de');

    this.$store.dispatch('GET_PROJECTS');
  },
  computed: {
    projects: function(): string[]{
      return this.$vStore.state.projects;
    }
  }
});
</script>
<style lang="scss">
html {
  overflow: hidden;
}
main.v-content {
  width: 100vw;
  max-height: calc(100vh - 64px);
  flex-direction: column;
  overflow-y: auto;
  margin-top: 64px;
  padding: 0 !important;
  margin: 0;
}
</style>
