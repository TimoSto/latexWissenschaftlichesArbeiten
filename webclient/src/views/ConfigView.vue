<template>
  <div id="configView">
    <v-app-bar
      dense
      color="background"
      elevate-on-scroll
      >

      <v-toolbar-title>{{$t(i18nDictionary.Config.Title)}}</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet class="content-below-two-bars" style="padding: 8px 16px;">
      <v-checkbox
          :label="$t(i18nDictionary.Config.DarkMode)"
          class="shrink mr-0 mt-0"
      />
      <v-checkbox
          :label="$t(i18nDictionary.Config.AutoOpen)"
          class="shrink mr-0 mt-0"
      />
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