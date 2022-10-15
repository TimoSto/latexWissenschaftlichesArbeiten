<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      clipped-left
      elevation="0"
      style="z-index: 101"
    >

      <v-app-bar-nav-icon @click="drawer = !drawer" :disabled="!drawerEnabled"/>

      <v-toolbar-title>ThesorTeX{{titleAppendix}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="goToView('home')" :title="$t(i18nDictionary.App.Homepage)">
        <v-icon>mdi-home</v-icon>
      </v-btn>

    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" permanent :mini-variant="drawer" clipped>
      <SidebarContent
          :title="$t(i18nDictionary.App.TitleAppendixProjects)"
          :closed="drawer" v-if="currentView === 'projects'"
          :items="projectNames"
          v-on:modelchange="handleProjectSelect"
          ref="sidebarProjects"
      />
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
import SidebarContent from "./components/SidebarContent.vue";
import {SidebarContentInterface} from "./components/SidebarContentInterface";
import ActionTypes from "./store/ActionTypes";

export default Vue.extend({
  name: 'App',
  components: {SidebarContent},
  data: () => ({
    drawer: false,
    i18nDictionary: i18nDictionary
  }),

  mounted() {
    if( this.$route.path.indexOf('/projects') === 0 ) {
      this.$store.commit(MutationTypes.App.SetCurrentView, 'projects')
    }

    this.$store.dispatch(ActionTypes.App.GetAppData);
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
    },
    projectNames() {
      return this.$store.state.App.ProjectNames;
    },
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
    },
    handleProjectSelect(n: number) {
      //if switch unsafe: (this.$refs.sidebarProjects as SidebarContentInterface).toItem(n); for backswitch
      if( n !== -1 ) {
        this.$store.commit(MutationTypes.ProjectView.SetCurrentProject, this.projectNames[n])
      } else {
        this.$store.commit(MutationTypes.ProjectView.SetCurrentProject, '')
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.v-app-bar{
  &.primary * {
    color: var(--v-primaryText-base)!important;
  }
  &.primary.theme--light .v-app-bar__nav-icon:disabled i {
    color: rgba(255, 255,255, 0.5)!important;
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
