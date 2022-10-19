<template>
  <NavArea :editor="true" :layout="twoThirdsMode ? 'two-thrids' : 'half-screen'">
    <template v-slot:page1>
      <ProjectInfoPage v-if="currentProjectName === ''"/>
      <ProjectOverviewPage v-if="currentProjectName !== ''" />
    </template>
    <template v-slot:edit-area>
      <EntryEditor />
    </template>
  </NavArea>
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "../i18n/Keys";
import ProjectInfoPage from "./projectsPages/ProjectInfoPage.vue";
import NavArea from "../components/NavArea.vue";
import ProjectOverviewPage from "./projectsPages/ProjectOverviewPage.vue";
import ActionTypes from "../store/ActionTypes";
import EntryEditor from "./projectsPages/EntryEditor.vue";

export default Vue.extend({
  name: "ProjectsView",
  components: {EntryEditor, ProjectOverviewPage, NavArea, ProjectInfoPage},
  data() {
    return {
      i18nDictionary: i18nDictionary,
      twoThirdsMode: false
    }
  },

  watch: {
    currentProjectName(nv) {
      console.log(nv)
      if( nv && nv.length > 0 ) {
        this.$store.dispatch(ActionTypes.Projects.GetProjectData, nv);
      }
    }
  },

  computed: {
    currentProjectName() {
      return this.$store.state.ProjectView.CurrentProject;
    }
  }
})
</script>

<style scoped>

</style>