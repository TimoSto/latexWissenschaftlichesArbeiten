<template>
  <div id="projectOverviewPage">
    <v-app-bar
      dense
      color="background"
      elevate-on-scroll
      >
      <v-toolbar-title style="font-style: italic">{{projectTitle}}</v-toolbar-title>

      <v-spacer />

      <v-btn icon :title="$t(i18nDictionary.Projects.Overview.DeleteProject)" @click="deleteOpen = true">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet class="content-below-two-bars">
      <v-expansion-panels tile flat hover multiple v-model="panels">

        <v-expansion-panel>
          <v-expansion-panel-header>{{$t(i18nDictionary.Projects.Overview.Entries)}}</v-expansion-panel-header>
          <v-expansion-panel-content class="content-width-padding">
            <EntryTable
                :entries="currentProjectData_Entries"
                :actions="[{Icon: 'mdi-plus', Title: 'Neuen Eintrag erstellen'}]"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>{{$t(i18nDictionary.Projects.Overview.Types)}}</v-expansion-panel-header>
          <v-expansion-panel-content class="content-width-padding">
            <TypesTable
                :types="currentProjectData_Types"
              :actions="[{Icon: 'mdi-plus', Title: 'Neuen Eintrag erstellen'}]"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-expansion-panels>
    </v-sheet>

    <ConfirmDialog
      :title="'Projekt löschen'"
      :content="'Sicher dass du lsöchen willst'"
      :abort="'Abbrechen'"
      :confirm="'Löschen'"
      :open="deleteOpen"
      v-on:discard="deleteOpen = false"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "../../i18n/Keys";
import EntryTable from "../../components/EntryTable.vue";
import TypesTable from "../../components/TypesTable.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";

export default Vue.extend({
  name: "ProjectOverviewPage",
  components: {ConfirmDialog, TypesTable, EntryTable},
  data() {
    return {
      panels: [0, 1],
      i18nDictionary: i18nDictionary,
      deleteOpen: false
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

  }
})
</script>

<style scoped>
.content-width-padding {
  padding: 8px;
}
</style>