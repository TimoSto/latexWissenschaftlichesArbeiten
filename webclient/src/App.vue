<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      clipped-left
      elevation="0"
    >

      <v-app-bar-nav-icon @click="drawer = !drawer" :disabled="!drawerEnabled"/>

      <v-toolbar-title>ThesorTeX{{titleAppendix}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="goToView('home')">
        <v-icon>mdi-home</v-icon>
      </v-btn>

    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" permanent :mini-variant="drawer" clipped>
      <div></div>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {i18nDictionary} from "./i18n/Keys";
import MutationTypes from "./store/MutationTypes";

export default Vue.extend({
  name: 'App',

  data: () => ({
    drawer: false,
    i18nDictionary: i18nDictionary
  }),

  mounted() {
    if( this.$route.path.indexOf('/projects') === 0 ) {
      this.$store.commit(MutationTypes.App.SetCurrentView, 'projects')
    }
  },

  computed: {
    drawerEnabled() {
      return !(this.$route.path === '/' || this.$route.path === '/config');
    },
    currentView() {
      return this.$store.state.App.CurrentView;
    },
    titleAppendix() {
      if( this.$route.path.indexOf('/projects') === 0 ) {
        return ' - ' + this.$t(i18nDictionary.App.TitleAppendixProjects)
      }
      return ''
    }
  },

  watch: {
    currentView(value: string) {
      //Here the router is updated
      if( value === 'projects' ) {
        if( this.$route.path.indexOf('/projects') !== 0 ) {
          this.$router.push('/projects')
        }
      }

      if( value === 'home' ) {
        if( this.$route.path !== '#/' ) {
          this.$router.push('/')
        }
      }
    },
    drawerEnabled(v) {
      if( !v ) {
        this.drawer = true;
      }
    }
  },

  methods: {
    goToView(view: string) {
      //here only state is updated
      this.$store.commit(MutationTypes.App.SetCurrentView, view)
    }
  }
});
</script>

<style lang="scss" scoped>
.v-app-bar{
  &.primary * {
    color: var(--v-primaryText-base)!important;
  }
  &.primary .v-app-bar__nav-icon:disabled i {
    //color: var(--v-background-darken3)!important;TODO: other color better than default?
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
  box-shadow: 0 3px 1px -2px rgba(255,255,255, 0.2), 0 2px 2px 0px rgba(255, 255, 255, 0.14), 0px 1px 5px 0px rgba(255, 255, 255, 0.12);
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

.v-toolbar__title {
  padding-right: 4px;
}

.two-col-table {
  & tr {
    & td:first-child {
      width: 150px;
    }
  }
}

.centered {
  padding: 0 8px;
  & .v-data-table {
    margin: 0 auto;
    border: 1px solid rgba(128,128,128, 0.25);;
  }
}
</style>
