<template>
  <div>
    <v-app-bar elevation="1" color="background" elevate-on-scroll scroll-target="#scroll-cv" style="z-index: 100" dense>
      <v-toolbar-title>{{$t(i18nDictionalry.CV_HEADING)}}</v-toolbar-title>
    </v-app-bar>
    <v-sheet class="content-below-two-bars" style="padding: 8px; background-color: var(--v-background-base)" id="scroll-cv">
      <p style="margin: 0 8px">{{$t(i18nDictionalry.CV_DESCR)}}</p>

    </v-sheet>
  </div>
</template>

<script>
import Vue from "vue";
import {i18nDictionary} from "@/i18n/Keys";

export default Vue.extend({
  name: "CV-View",
  data() {
    return {
      i18nDictionalry: i18nDictionary
    }
  }
});
</script>

<style scoped>

</style>