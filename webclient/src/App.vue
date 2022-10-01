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

      <v-toolbar-title>ThesorTeX</v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="toggleDark" :title="$vuetify.theme.dark ? $t(i18nDictionary.SWITCH_LIGHT) : $t(i18nDictionary.SWITCH_DARK)">
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>

      <v-btn icon @click="toHome" :title="$t(i18nDictionary.HOME_TT)">
        <v-icon>mdi-home</v-icon>
      </v-btn>

    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" permanent :mini-variant="drawer" clipped>
      <v-app-bar elevation="1" color="background" elevate-on-scroll scroll-target="#scroll-sidebar" dense>
        <v-toolbar-title v-if="!drawer">{{$t(i18nDictionary.PROJECTS)}}</v-toolbar-title>
        <v-spacer v-if="!drawer"></v-spacer>
        <v-btn icon @click="newDialog = !newDialog" :title="$t(i18nDictionary.NEW_PROJECT_TOOLTIP)">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-app-bar>
      <v-sheet class="content-below-two-bars" style="padding: 0; background-color: var(--v-background-base)" id="scroll-sidebar">
        <v-list class="keep">
          <v-list-item-group v-model="indexOfCurrentProjectName" color="accent">
            <v-list-item v-for="(item,i) in projectNames" :key="'project-' + i">
              <v-list-item-title>{{item}}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-sheet>
    </v-navigation-drawer>

    <v-main>
      <router-view :projectName="currentProjectName" />

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

      <MySnackbar :timeout="5 * 1000" v-model="snackbarOpened" v-on:timeoutReached="closeSnackbar">
        <span v-html="snackBarMessage"></span>
        <template v-slot:action="{ attrs }">
          <v-btn
              color="primary"
              text
              v-bind="attrs"
              @click="closeSnackbar"
          >
            Schließen
          </v-btn>
        </template>
      </MySnackbar>

    </v-main>

  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {MutationTypes} from "./store/mutation-types";
import {ActionTypes} from "./store/action-types";
import { GermanTranslations } from './i18n/German';
import MySnackbar from './components/MySnackbar.vue';
import {i18nDictionary} from "./i18n/Keys";

export default Vue.extend({
  name: 'App',

  components: {MySnackbar},

  data: () => ({
    drawer: false,
    newDialog: false,
    newProjectName: '',
    i18nDictionary: i18nDictionary
  }),

  mounted() {
    this.$store.dispatch(ActionTypes.APP_GET_PROJECTS);

    let urlParts = window.location.hash.split("/project/")
    if( urlParts.length > 1 ) {
      this.$store.commit(MutationTypes.APP_SET_PROJECTNAME, urlParts[1])
    }

    this.$vuetify.theme.dark = localStorage.getItem('ThesorTeX_darkMode') === 'true'
  },

  methods: {
    toggleDark() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('ThesorTeX_darkMode', `${this.$vuetify.theme.dark}`)
    },
    createNewProject() {
      this.$store.dispatch(ActionTypes.APP_CREATE_PROJECT, this.newProjectName)
    },
    closeSnackbar() {
      switch (this.$store.state.app.successMessage) {
        case "PROJECT_CREATED":
          this.newProjectName = '';
      }
      this.$store.commit(MutationTypes.APP_SET_SUCCESS, '')
    },
    switchToProject(name: string) {
      if( name !== this.currentProjectName ) {
        this.$store.commit(MutationTypes.APP_SET_PROJECTNAME, name)
      }
    },
    toHome() {
      //TODO: check stuff
      this.$store.commit(MutationTypes.APP_SET_PROJECTNAME, '');
      this.$router.push('/');
    }
  },

  computed: {
    projectNames(): string[] {
      return this.$store.state.app.projectNames
    },
    currentProjectName(): string {
      return this.$store.state.app.currentProjectName;
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
    snackBarMessage() {
      if( this.$store.state.app.successMessage.length === 0) {
        return ''
      }

      let translationKey = this.$store.state.app.successMessage
      let appendix = '';
      if( translationKey.indexOf('%') > 0 ) {
        let parts = translationKey.split('%')
        translationKey = parts[0]
        appendix = parts[1]
      }

      let translation = this.$t(translationKey) as string

      switch (translationKey) {
        case "SUCCESS_PROJECT_CREATED":
          translation = translation.replace("%s", this.newProjectName);
          break;
        case 'SUCCESS_PROJECT_DELETED':
          translation = translation.replace("%s", this.$store.state.app.deletedProject);
          break;
        case "SUCCESS_PROJECT_BACKUP":
          translation = translation.replace('%v', appendix)
          break;
      }

      return translation
    },
    snackbarOpened(): boolean {
      return !!this.snackBarMessage && this.snackBarMessage.length > 0
    },
    indexOfCurrentProjectName: {
      get() {
        return this.$store.state.app.projectNames.indexOf(this.$store.state.app.currentProjectName)
      },
      set(value: number) {
        if( value >=0 && value < this.$store.state.app.projectNames.length ) {
          const projectBefore = this.$store.state.app.currentProjectName;
          this.$store.commit(MutationTypes.APP_SET_PROJECTNAME, this.$store.state.app.projectNames[value]);
          if( projectBefore !== this.$store.state.app.projectNames[value] ) {
            this.$router.push(`/project/${this.$store.state.app.projectNames[value]}`)
          }
        }
      }
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

//TODO: warum funktioniert elevate in home etc. nicht???/Warum ist main-bereich nach ohen scroll-verschiebbar
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
