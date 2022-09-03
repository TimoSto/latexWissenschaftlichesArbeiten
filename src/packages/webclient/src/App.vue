<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left elevation="0" fixed scroll-target="main">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>ThesorTeX{{helpOpen}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          icon
          @click="toggleTwoThirds"
          :title="splitBtnContent[1]"
          v-if="typeEditorOpen || entryEditorOpen"
          style="font-size: 20px"
      >
        <span v-html="splitBtnContent[0]"></span>
      </v-btn>
      <v-btn icon title="Hilfe" @click="helpOpen = !helpOpen">
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
      <v-btn
          icon
          @click="toggleDark"
          title="Design wechseln">
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>
      <v-btn
          icon
          @click="toHome"
          title="Startseite">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-menu offset-y style="z-index: 100" content-class="elevation-3">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              icon
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list style="cursor: pointer">
          <v-list-item ripple @click="toDocumentation">
            <v-list-item-avatar>
              <v-icon>mdi-book-open-blank-variant</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Dokumentation</v-list-item-title>
          </v-list-item>
          <v-list-item ripple href="/cv?type=tex" download="CVTemplate.tex">
            <v-list-item-avatar>
              <v-icon>mdi-download</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Vorlage Lebenslauf</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" permanent :mini-variant="drawer" clipped>
      <v-app-bar elevation="0" color="background">
        <v-toolbar-title v-if="!drawer">Projekte</v-toolbar-title>
        <v-spacer v-if="!drawer"></v-spacer>
        <v-btn icon :to="'/new'" title="Neues Projekt erstellen" @click="CloseEditors">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-app-bar>
      <v-sheet style="overflow-y: auto; height: calc(100vh - 130px); padding: 0; background-color: var(--v-background-base)" id="scrollsidebar">
        <v-list class="keep">
          <v-list-item v-for="proj in projects" :key="proj" @click="toProject(proj)">
            <v-list-item-title v-text="proj"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-navigation-drawer>

    <v-main fill-height id="main" pt-0>
      <router-view />
    </v-main>
    <v-dialog v-model="helpOpen" width="500">
      <TeXHelpDialog />
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {MutationTypes} from "@/store/mutation-types";
import TeXHelpDialog from "@/components/TeXHelpDialog.vue";

export default Vue.extend({
  name: 'App',
  components: {TeXHelpDialog},
  data: () => ({
    drawer: false,
    helpOpen: false
  }),
  methods: {
    toggleDark () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('ThesorTeX_DarkMode', String(this.$vuetify.theme.dark))
    },
    toggleTwoThirds() {
      this.$store.commit(MutationTypes.TOGGLE_TWO_THIRDS);
    },
    CloseEditors() {
      this.$store.commit(MutationTypes.SET_TYPE_TO_EDIT, '');
      this.$store.commit(MutationTypes.SET_ENTRY_TO_EDIT, '');
    },
    toHome() {
      this.CloseEditors();
      this.$router.push('/')
    },
    toProject(project: string) {
      const path = '/project/' + project;
      if( this.$route.path !== path ) {
        this.CloseEditors();
        this.$router.push(path)
      }
    },
    toDocumentation() {
      const path = '/pdf/documentation';
      if( this.$route.path !== path ) {
        this.CloseEditors();
        this.$router.push(path)
      }
    },
    toCV() {
      this.CloseEditors();
      this.$router.push('/pdf/cv')
    }
  },
  created() {
    this.$vuetify.theme.dark = localStorage.getItem('ThesorTeX_DarkMode') === 'true';
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
    splitBtnContent() {

      if( this.$store.state.twoThirdsActive ) {
        return [
          '&#189;',
          'Wechsel zu 50:50-Layout'
        ]
      }
      return [
          '&#8532;',
          'Wechsel zu 70:30-Layout'
      ]
    },
    typeEditorOpen() {
      return !!this.$store.state.typeToEdit.Name || this.$store.state.typeToEdit.Name == ''
    },
    entryEditorOpen() {
      return !!this.$store.state.entryToEdit.Key || this.$store.state.entryToEdit.Key == ''
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
.theme--light.v-text-field:not(.v-input--has-state):hover > .v-input__control > .v-input__slot:before,
.theme--dark.v-text-field:not(.v-input--has-state):hover > .v-input__control > .v-input__slot:before {
  border-color: inherit!important;
}

.theme--light.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: 0px 2px 0px 0px rgb(0 0 0 / 20%), 0px 4px 5px -5px rgb(0 0 0 / 14%), 0px 1px 10px -10px rgb(0 0 0 / 12%);
}
.theme--dark.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: 0px 2px 4px -4px rgba(255, 255,255, 0.2), 0px 4px 5px -5px rgba(0255, 255, 255 , 0.14), 0px 1px 10px -10px rgba(255, 255, 255, 0.12);
}
</style>
