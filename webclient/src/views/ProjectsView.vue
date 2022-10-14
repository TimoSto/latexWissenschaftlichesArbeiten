<template>
  <div style="display: flex">
    <ProjectInfoPage />
  </div>
</template>

<script lang="ts">
import {i18nDictionary} from "../i18n/Keys";
import ProjectInfoPage from "./projectsPages/ProjectInfoPage.vue";

export default {
  name: "ProjectsView",
  components: {ProjectInfoPage},
  data() {
    return {
      i18nDictionary: i18nDictionary
    }
  }
}
</script>

<style scoped>

</style>