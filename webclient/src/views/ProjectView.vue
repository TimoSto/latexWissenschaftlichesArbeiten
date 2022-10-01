<template>
  <div style="display: flex" :class="layoutClass">

    <div id="pages">
      <ProjectOverView :projectName="projectName" />
    </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProjectOverView from "./ProjectOverView.vue";

export default Vue.extend({
  name: "Project-View",
  components: {ProjectOverView},
  props: [
      'projectName'
  ],
  data() {
    return {
      //
    }
  },

  computed: {
    layoutClass(): string[] {
      return [
          "editor-closed",
          "one-page"
      ]
    }
  }
});
</script>

<style scoped lang="scss">

.editor-closed {
  & #pages {
    width: 100%;
  }
}

</style>