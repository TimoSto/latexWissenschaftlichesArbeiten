<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      clipped-left
      elevation="1"
      fixed
      elevate-on-scroll
    >

      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-toolbar-title>ThesorTeX</v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="toggleDark">
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>

    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" permanent :mini-variant="drawer" clipped>
      <v-app-bar elevation="1" color="background" elevate-on-scroll scroll-target="#scroll-sidebar" dense>
        <v-toolbar-title v-if="!drawer">Projekte</v-toolbar-title>
        <v-spacer v-if="!drawer"></v-spacer>
        <v-btn icon @click="newDialog = !newDialog" title="Neues Projekt erstellen">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-app-bar>
      <v-sheet class="content-below-two-bars" style="padding: 0; background-color: var(--v-background-base)" id="scroll-sidebar">
        <v-list class="keep">
          <v-list-item v-for="proj in projectNames" :key="proj">
            <v-list-item-title v-text="proj"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-navigation-drawer>

    <v-main>
      <router-view/>

      <v-dialog v-model="newDialog" width="300">
        <v-card>
          <v-card-title>Neues Projekt</v-card-title>
          <v-card-text style="padding-bottom: 0">
            <v-text-field v-model="newProjectName" label="Projektname" filled style="width: 250px" :rules="newProjectRules">
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="newDialog = false">Abbrechen</v-btn>
            <v-btn color="primary" @click="createNewProject(); newDialog = false" :disabled="!newProjectNameValid">Speichern</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
    drawer: false,
    newDialog: false,
    newProjectName: ''
  }),

  mounted() {
    this.$store.dispatch(ActionTypes.APP_GET_PROJECTS)
  },

  methods: {
    toggleDark() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    createNewProject() {
      this.$store.dispatch(ActionTypes.APP_CREATE_PROJECT, this.newProjectName)
    },
  },


  computed: {
    projectNames(): string[] {
      return this.$store.state.app.projectNames
    },
    newProjectRules() {
      return [
        (v: string) => {
          if ( this.projectNames.indexOf(v) !== -1) return 'Projektname bereits vergeben'
          if ( v.indexOf(' ') >= 0 ) return 'Projektname darf kein Leerzeichen enthalten‚'
          return true
        },
      ]
    },
    newProjectNameValid() {
      let res = true;
      this.newProjectRules.forEach(rule => {
        const val = rule(this.newProjectName)
        if ( val !== true ) {
          res = false;
        }
      });
      return res && this.newProjectName.length > 0
    },
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

<style lang="scss">
$dark-bg: #121212;

.theme--dark.v-expansion-panels .v-expansion-panel:not(.keep){
  background-color: $dark-bg;
}
.theme--dark.v-list:not(.keep) {
  background-color: $dark-bg;
}
.theme--dark.v-sheet:not(.keep) {
  background-color: $dark-bg;
}

.theme--dark.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: 0px 3px 1px -2px rgba(255,255,255, 0.2), 0px 2px 2px 0px rgba(255, 255, 255, 0.14), 0px 1px 5px 0px rgba(255, 255, 255, 0.12);
}

//TODO: warum funktioniert elevate in home etc. nicht???
.content-below-two-bars {
  height: calc(100vh - 112px);
  overflow-y: auto;

  @media screen and (max-width: 959px) {
    height: calc(100vh - 105px)!important;
  }
}

.content-below-one-bar {
  overflow-y: auto;
  height: calc(100vh - 64px);

  @media screen and (max-width: 959px) {
    height: calc(100vh - 56px);
  }
}

</style>
