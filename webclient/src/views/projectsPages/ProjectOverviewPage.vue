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
      <v-expansion-panels tile flat hover focusable multiple v-model="panels">

        <v-expansion-panel>
          <v-expansion-panel-header>{{$t(i18nDictionary.Projects.Overview.Entries)}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <EntryTable :entries="[{Key: '1'}, {Key: '2'}]"/>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>{{$t(i18nDictionary.Projects.Overview.Types)}}</v-expansion-panel-header>
          <v-expansion-panel-content>

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

export default Vue.extend({
  name: "ProjectOverviewPage",
  components: {EntryTable},
  data() {
    return {
      panels: [0],
      i18nDictionary: i18nDictionary
    }
  },

  computed: {

    projectTitle() {
      return this.$store.state.ProjectView.CurrentProject;
    }

  }
})
</script>

<style scoped>

</style>