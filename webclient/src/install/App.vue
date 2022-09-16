<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left elevation="0" fixed scroll-target="main">
      <v-toolbar-title>ThesorTeX - Installer</v-toolbar-title>

    </v-app-bar>

    <v-main fill-height id="main" pt-0>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Changelog
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <ChangelogView />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {MutationTypes} from "@/store/mutation-types";
import TeXHelpDialog from "@/components/TeXHelpDialog.vue";
import ChangelogView from "@/views/ChangelogView.vue";
export default Vue.extend({
  name: 'App',
  components: {ChangelogView},
  data: () => ({
    drawer: false,
    helpOpen: false
  }),
  methods: {
    toggleDark () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('ThesorTeX_DarkMode', String(this.$vuetify.theme.dark))
    },
  },
  created() {
    this.$vuetify.theme.dark = localStorage.getItem('ThesorTeX_DarkMode') === 'true';
    // Setting Language in the HTML document
    document.documentElement.setAttribute('lang', 'de');
  },
  computed: {
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