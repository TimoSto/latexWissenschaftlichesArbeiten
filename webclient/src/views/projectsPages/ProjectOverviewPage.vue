<template>
  <div id="projectOverviewPage">
    <v-app-bar
      dense
      color="background"
      elevate-on-scroll
      >
      <v-toolbar-title style="font-style: italic">{{projectTitle}}</v-toolbar-title>

      <v-spacer />

      <v-btn icon>
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet class="content-below-two-bars">
      <v-expansion-panels tile flat hover multiple v-model="panels">

        <v-expansion-panel>
          <v-expansion-panel-header>{{$t(i18nDictionary.Projects.Overview.Entries)}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <EntryTable
                :entries="currentProjectData_Entries"
                :actions="[{Icon: 'mdi-plus', Title: 'Neuen Eintrag erstellen'}]"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>{{$t(i18nDictionary.Projects.Overview.Types)}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <TypesTable
                :types="currentProjectData_Types"
              :actions="[{Icon: 'mdi-plus', Title: 'Neuen Eintrag erstellen'}]"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-expansion-panels>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "../../i18n/Keys";
import EntryTable from "../../components/EntryTable.vue";
import TypesTable from "../../components/TypesTable.vue";

export default Vue.extend({
  name: "ProjectOverviewPage",
  components: {TypesTable, EntryTable},
  data() {
    return {
      panels: [0],
      i18nDictionary: i18nDictionary
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

</style>