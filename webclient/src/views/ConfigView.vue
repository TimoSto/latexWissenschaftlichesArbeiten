<template>
  <div>
    <v-app-bar dense color="background" elevation="1" elevate-on-scroll scroll-target="#scroll-config" style="z-index: 100">
      <v-toolbar-title>{{$t(i18nDictionary.CONFIG_VIEW)}}</v-toolbar-title>
    </v-app-bar>
    <v-sheet id="scroll-config" class="content-below-two-bars">
    </v-sheet>
  </div>
</template>

<script>
import {i18nDictionary} from "@/i18n/Keys";

export default {
  name: "ConfigView",
  data() {
    return {
      i18nDictionary: i18nDictionary
    }
  }
}
</script>

<style scoped>

</style>