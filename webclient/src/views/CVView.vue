<template>
  <div>
    <v-app-bar elevation="1" color="background" elevate-on-scroll scroll-target="#scroll-sidebar" style="z-index: 100" dense>
      <v-toolbar-title>{{$t(i18nDictionalry.CV_HEADING)}}</v-toolbar-title>
    </v-app-bar>
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