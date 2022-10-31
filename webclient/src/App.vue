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

      <v-btn icon @click="goToView('home')" :title="$t(i18nDictionary.App.Homepage)" :disabled="currentView === 'home'">
        <v-icon>mdi-home</v-icon>
      </v-btn>

    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" permanent :mini-variant="drawer" clipped style="z-index: 100">
      <SidebarContent
          :title="$t(i18nDictionary.App.TitleAppendixProjects)"
          :closed="drawer" v-if="currentView === 'projects'"
          :items="projectNames"
          :addTitle="$t(i18nDictionary.Projects.New.Title)"
          v-on:modelchange="handleProjectSelect"
          ref="sidebarProjects"
          v-on:triggerAdd="openNewDialog('newProject')"
      />
    </v-navigation-drawer>

    <v-main>
      <router-view v-on:unsafeCloseTriggered="triggerInterrupt($event)" />
    </v-main>

    <NewDialog
        :title="newDialogTitle"
        :label="newDialogLabel"
        :open="newDialogTriggered"
        :rules="newDialogRules"
        v-on:discard="newDialogTriggered = false"
        v-on:save="handleSaveInNewDialog"
    />

    <SuccessSnackbar />

    <UnsavedChangesDialog
        :open="interruptNavigationTriggered"
        v-on:closed="interruptNavigationTriggered = false"
        ref="interruptDialog"
    />

  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "./i18n/Keys";
import MutationTypes from "./store/MutationTypes";
import SidebarContent from "./components/SidebarContent.vue";
import ActionTypes from "./store/ActionTypes";
import { SidebarContentInterface } from './components/SidebarContentInterface';
import NewDialog from "./components/NewDialog.vue";
import ProjectNameRules from "./inputRules/ProjectNameRules";
import SuccessSnackbar from "./components/SuccessSnackbar.vue";
import UnsavedChangesDialog, {InterruptNavigationCallback} from "./components/UnsavedChangesDialog.vue";
import {UnsavedChangesDialogInterface} from "./components/UnsavedChangesDialogInterface";

export default Vue.extend({
  name: 'App',
  components: {UnsavedChangesDialog, SuccessSnackbar, NewDialog, SidebarContent},
  data: () => ({
    drawer: false,
    i18nDictionary: i18nDictionary,
    newDialogTriggered: false,
    newDialogType: '',
    interruptNavigationTriggered: false,
    interruptNavigationCallback: {} as InterruptNavigationCallback,
  }),

  created() {
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
    Loaded() {
      return this.$store.state.App.Loaded;
    },
    newDialogTitle() {
      if( this.newDialogType === 'newProject' ) {
        return this.$t(i18nDictionary.Projects.New.Title)
      }
      return ''
    },
    newDialogLabel() {
      if( this.newDialogType === 'newProject' ) {
        return this.$t(i18nDictionary.Projects.New.Label)
      }
      return ''
    },
    newDialogRules(): ((v: string) => boolean | string)[] {
      const translator = (v: string) => {
        return this.$t(v)
      }
      if( this.newDialogType === 'newProject' ) {
        return ProjectNameRules(this.projectNames, translator)
      }
      return []
    },
    unsavedChanges: {
      get(): boolean {
        return !this.$store.state.Global.UnsavedChanged;
      },
      set(v: boolean) {
        this.$store.commit(MutationTypes.Global.SetUnsavedChanges, v)
      }
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
        if( this.$route.path !== '/' ) {
          this.$router.push('/')
        }
      }

      if( value === 'config' ) {
        if( this.$route.path !== '/config' ) {
          this.$router.push('/config')
        }
      }
    },
    drawerEnabled(v) {
      if( !v ) {
        this.drawer = true;
      }
    },
    Loaded() {
      this.$vuetify.theme.dark = this.$store.state.App.Config.DarkMode;

      //initial setting up for all views here to have all other components available
      if( this.$route.path.indexOf('/projects') === 0 ) {
        this.$store.commit(MutationTypes.App.SetCurrentView, 'projects')

        if( this.$route.path !== '/projects' ) {
          const currentProject = this.$route.path.split('/projects/')[1];
          this.$store.commit(MutationTypes.ProjectView.SetCurrentProject, currentProject);
        }

      } else if ( this.$route.path === '/config' ) {
        this.$store.commit(MutationTypes.App.SetCurrentView, 'config');
      }

      if( this.$store.state.App.CurrentView === 'projects' ) {
        this.setSidebarToCurrentProject()
      }
    },
    projectNames() {
      if( this.$store.state.ProjectView.CurrentProject ) {
        this.setSidebarToCurrentProject();
      }
    }
  },

  methods: {
    goToView(view: string) {
      //here only state is updated
      if( !this.unsavedChanges ) {
        this.triggerInterrupt(() => {
          this.goToView(view);
        })
        return;
      }

      this.$store.commit(MutationTypes.App.SetCurrentView, view)
    },
    handleProjectSelect(n: number) {
      const newIndex= this.$store.state.App.ProjectNames.indexOf(this.$store.state.ProjectView.CurrentProject);
      if( n === newIndex ) {
        return;
      }
      if( !this.unsavedChanges ) {
        (this.$refs.sidebarProjects as SidebarContentInterface).toItem(newIndex);
        this.triggerInterrupt(() => {
            this.handleProjectSelect(n);
        });
        return;
      }

      if( n !== -1 ) {
        this.$store.commit(MutationTypes.ProjectView.SetCurrentProject, this.projectNames[n]);
        if( this.$route.path !== `/projects/${this.projectNames[n]}` ) {
          this.$router.push(`/projects/${this.projectNames[n]}`)
        }
      } else {
        this.$store.commit(MutationTypes.ProjectView.SetCurrentProject, '');
        if( this.$route.path !== '/projects' ){
          this.$router.push('/projects')
        }
      }
    },
    openNewDialog(type: string) {
      this.newDialogTriggered = true;
      this.newDialogType = type;
    },
    handleSaveInNewDialog(v: string) {
      if( this.newDialogType === 'newProject' ) {
        this.newDialogTriggered = false;
        this.newDialogType = '';
        this.$store.dispatch(ActionTypes.Projects.CreateProject, v)
      }
    },
    setSidebarToCurrentProject() {
      if (this.$refs.sidebarProjects) {
        (this.$refs.sidebarProjects as SidebarContentInterface).toItem(this.projectNames.indexOf(this.$store.state.ProjectView.CurrentProject));
      } else {
        this.$nextTick(() => {
          (this.$refs.sidebarProjects as SidebarContentInterface).toItem(this.projectNames.indexOf(this.$store.state.ProjectView.CurrentProject));
        })
      }
    },
    triggerInterrupt(cb: () => void) {
      this.interruptNavigationTriggered = true;

      (this.$refs.interruptDialog as UnsavedChangesDialogInterface).setCallback(() => {
        this.$store.commit(MutationTypes.Global.SetUnsavedChanges, false);
        this.interruptNavigationTriggered = false;
        cb();
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.v-app-bar{
  &.primary * {
    color: var(--v-primaryText-base)!important;
  }
  &.primary.theme--light .v-app-bar__nav-icon:disabled i,
  &.primary.theme--light .v-btn:disabled i{
    color: rgba(255, 255,255, 0.65)!important;
  }
  &.primary.theme--dark .v-app-bar__nav-icon:disabled i,
  &.primary.theme--dark .v-btn:disabled i{
    color: rgba(255, 255,255, 0.65)!important;
  }
}
</style>

<style lang="scss">
@use "styles/theme-fixes";

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
