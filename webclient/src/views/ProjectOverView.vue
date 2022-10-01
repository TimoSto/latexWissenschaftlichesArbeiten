<template>
  <div>

    <v-app-bar dense color="background" elevation="1" elevate-on-scroll style="z-index: 100" scroll-target="#scroll-project">
      <v-toolbar-title>{{projectName}}</v-toolbar-title>

      <v-spacer />

      <v-btn icon :title="$t(i18nDictionary.DELETE_PROJECT)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-app-bar>

    <v-sheet id="scroll-project">

    </v-sheet>

  </div>
</template>

<script>
import Vue from "vue";
import {i18nDictionary} from "@/i18n/Keys";

export default Vue.extend({
  name: "Project-OverView",
  props: [
      'projectName'
  ],
  data() {
    return {
      i18nDictionary: i18nDictionary
    }
  }
});
</script>

<style scoped>

</style>