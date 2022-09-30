<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      clipped-left
      elevation="0"
      fixed
    >

      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-toolbar-title>ThesorTeX{{$store.state.app.t}}</v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="toggleDark">
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>

    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" permanent :mini-variant="drawer" clipped>
      <v-app-bar elevation="1" color="background" elevate-on-scroll scroll-target="#scroll-sidebar">
        <v-toolbar-title v-if="!drawer">Projekte</v-toolbar-title>
        <v-spacer v-if="!drawer"></v-spacer>
        <v-btn icon :to="'/new'" title="Neues Projekt erstellen">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-app-bar>
      <v-sheet style="overflow-y: auto; height: calc(100vh - 130px); padding: 0; background-color: var(--v-background-base)" id="scroll-sidebar">
        <v-list class="keep">
          <v-list-item v-for="proj in projectNames" :key="proj">
            <v-list-item-title v-text="proj"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {MutationTypes} from "./store/mutation-types";
import {ActionTypes} from "./store/action-types";

export default Vue.extend({
  name: 'App',

  data: () => ({
    drawer: false
  }),

  mounted() {
    this.$store.dispatch(ActionTypes.APP_GET_PROJECTS)
  },

  methods: {
    toggleDark() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  },


  computed: {
    projectNames(): string[] {
      return this.$store.state.app.projectNames
    }
  }

});
</script>

<style lang="scss" scoped>
.v-app-bar{
  &.primary * {
    color: var(--v-primaryText-base)!important;
  }
}
</style>
