<template>
  <div style="display: flex">
    <ProjectInfoPage v-if="currentProjectName === ''"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "../i18n/Keys";
import ProjectInfoPage from "./projectsPages/ProjectInfoPage.vue";

export default Vue.extend({
  name: "ProjectsView",
  components: {ProjectInfoPage},
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