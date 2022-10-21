<template>
  <div>
    <v-app-bar
        color="background"
        elevate-on-scroll
        dense
        >
      <v-toolbar-title>Kategorie</v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="$emit('toggleTwoThirds')" style="font-size: 20px" :title="layoutBtnContent[1]">
        <span v-html="layoutBtnContent[0]" style="color: var(--v-accent-lighten2)"></span>
      </v-btn>
      <v-btn icon :title="$t(i18nDictionary.Common.Delete)" >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon :title="$t(i18nDictionary.Common.Close)" @click="$emit('closeEditor')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import {i18nDictionary} from "@/i18n/Keys";

export default {
  name: "CategoryEditor",
  props: [
      'layoutBtnContent'
  ],
  data() {
    return {
      i18nDictionary: i18nDictionary,
    }
  }
}
</script>

<style scoped>

</style>