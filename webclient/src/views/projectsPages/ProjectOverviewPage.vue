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
      hallo
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ProjectOverviewPage",

  computed: {

    projectTitle() {
      return this.$store.state.ProjectView.CurrentProject;
    }

  }
})
</script>

<style scoped>

</style>