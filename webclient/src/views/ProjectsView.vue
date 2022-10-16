<template>
  <NavArea>
    <template v-slot:page1>
      <ProjectInfoPage v-if="currentProjectName === ''"/>
      <ProjectOverviewPage v-if="currentProjectName !== ''" />
    </template>
  </NavArea>
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "../i18n/Keys";
import ProjectInfoPage from "./projectsPages/ProjectInfoPage.vue";
import NavArea from "../components/NavArea.vue";
import ProjectOverviewPage from "./projectsPages/ProjectOverviewPage.vue";

export default Vue.extend({
  name: "ProjectsView",
  components: {ProjectOverviewPage, NavArea, ProjectInfoPage},
  data() {
    return {
      i18nDictionary: i18nDictionary
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