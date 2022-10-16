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
import MutationTypes from "../store/MutationTypes";

export default Vue.extend({
  name: "ProjectsView",
  components: {ProjectOverviewPage, NavArea, ProjectInfoPage},
  data() {
    return {
      i18nDictionary: i18nDictionary
    }
  },

  mounted() {
    if( this.$route.path !== '/projects' ) {
      const currentProject = this.$route.path.split('/projects/')[1];
      this.$store.commit(MutationTypes.ProjectView.SetCurrentProject, currentProject);
      this.$nextTick(() => {
        this.$emit('initialProjectSet');
      })
    }
  },

  watch: {
    currentProjectName(v) {
      if( !v ) {
        return
      }
      console.log(v)
      if( v !== '' ) {
        if( this.$route.path !== `/projects/${v}` ) {
          this.$router.push(`/projects/${v}`)
        }
      } else if( this.$route.path !== '/projects' ){
        this.$router.push('/projects')
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