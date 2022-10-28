<template>
  <div id="projectOverviewPage">
    <v-app-bar
      dense
      color="background"
      elevate-on-scroll
      scroll-target="#overview-scroll"
      style="z-index: 99"
      >
      <v-toolbar-title style="font-style: italic">{{projectTitle}}</v-toolbar-title>

      <v-spacer />

      <v-menu :offset-y="true">
        <template v-slot:activator="{on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item :title="$t(i18nDictionary.Projects.Overview.DeleteProject)" @click="deleteOpen = true">
            <v-list-item-icon>
              <v-icon>mdi-delete</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{$t(i18nDictionary.Projects.Overview.DeleteProject)}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item :title="$t(i18nDictionary.Projects.Overview.CreateBackup)" @click="backupThisProject">
            <v-list-item-icon>
              <v-icon>mdi-cloud-upload</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{$t(i18nDictionary.Projects.Overview.CreateBackup)}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item :title="$t(i18nDictionary.Projects.Overview.LoadBackup)" @click="backupTriggered = true">
            <v-list-item-icon>
              <v-icon>mdi-cloud-download</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{$t(i18nDictionary.Projects.Overview.LoadBackup)}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-menu>
    </v-app-bar>
    <v-sheet class="content-below-two-bars" id="overview-scroll">
      <v-expansion-panels tile flat hover multiple v-model="panels">

        <v-expansion-panel>
          <v-expansion-panel-header>{{$t(i18nDictionary.Projects.Overview.Entries)}}</v-expansion-panel-header>
          <v-expansion-panel-content class="content-with-padding">
            <CitaviDragNDrop />
            <EntryTable
                :entries="currentProjectData_Entries"
                :actions="[{Icon: 'mdi-plus', Title: 'Neuen Eintrag erstellen', Callback: 'new'}]"
                v-on:select="$emit('openEditor', {Type: 'entry', Element: $event})"
                v-on:new="$emit('openEditor', {Type: 'entry', Element: -1})"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>{{$t(i18nDictionary.Projects.Overview.Types)}}</v-expansion-panel-header>
          <v-expansion-panel-content class="content-with-padding">
            <TypesTable
                :types="currentProjectData_Types"
                :actions="[{Icon: 'mdi-plus', Title: 'Neue Kategorie erstellen', Callback: 'new'}]"
                v-on:select="$emit('openEditor', {Type: 'category', Element: $event})"
                v-on:new="$emit('openEditor', {Type: 'category', Element: -1})"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-expansion-panels>
    </v-sheet>

    <ConfirmDialog
      :title="$t(i18nDictionary.Projects.Overview.DeleteProjectDialog.Title)"
      :content="$t(i18nDictionary.Projects.Overview.DeleteProjectDialog.Content)"
      :abort="$t(i18nDictionary.Common.Abort)"
      :confirm="$t(i18nDictionary.Common.Delete)"
      :open="deleteOpen"
      v-on:discard="deleteOpen = false"
      v-on:confirm="deleteThisProject"
    />

    <BackupDialog :open="backupTriggered" v-on:closed="backupTriggered = false"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "../../i18n/Keys";
import EntryTable from "../../components/EntryTable.vue";
import TypesTable from "../../components/TypesTable.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import ActionTypes from "../../store/ActionTypes";
import CitaviDragNDrop from "../../components/CitaviDragNDrop.vue";
import BackupDialog from "../../components/BackupDialog.vue";

export default Vue.extend({
  name: "ProjectOverviewPage",
  components: {BackupDialog, CitaviDragNDrop, ConfirmDialog, TypesTable, EntryTable},
  data() {
    return {
      panels: [0, 1],
      i18nDictionary: i18nDictionary,
      deleteOpen: false,
      backupTriggered: false
    }
  },

  computed: {

    projectTitle() {
      return this.$store.state.ProjectView.CurrentProject;
    },

    currentProjectData_Entries() {
      return this.$store.state.ProjectView.CurrentProjectData.bibEntries;
    },

    currentProjectData_Types() {
      return this.$store.state.ProjectView.CurrentProjectData.bibTypes;
    }

  },

  methods: {
    deleteThisProject() {
      this.$store.dispatch(ActionTypes.Projects.DeleteProject, this.$store.state.ProjectView.CurrentProject);
    },
    backupThisProject() {
      this.$store.dispatch(ActionTypes.Projects.Overview.CreateBackup, this.$store.state.ProjectView.CurrentProject);
    }
  }
})
</script>

<style scoped lang="scss">
@use '@/styles/tableClasses.scss';
</style>