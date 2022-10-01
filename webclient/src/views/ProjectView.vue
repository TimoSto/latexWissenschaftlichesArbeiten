<template>
  <div>

    <v-app-bar dense color="background" elevation="1" elevate-on-scroll style="z-index: 100">
      <v-toolbar-title>{{projectName}}</v-toolbar-title>
    </v-app-bar>

  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Project-View",
  props: [
      'projectName'
  ]
});
</script>

<style scoped>

</style>