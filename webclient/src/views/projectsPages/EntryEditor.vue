<template>
  <div>
    <v-app-bar
        color="background"
        elevate-on-scroll
        dense
        scroll-target="#entry-scroll"
        >
      <v-toolbar-title>Eintrag</v-toolbar-title>

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
    <v-sheet class="content-below-two-bars" id="entry-scroll">

      <v-expansion-panels tile flat hover multiple v-model="panels">

        <v-expansion-panel>
          <v-expansion-panel-header>{{$t(i18nDictionary.Projects.CategoryEditor.Properties)}}</v-expansion-panel-header>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>{{$t(i18nDictionary.Projects.EntryEditor.Fields)}}</v-expansion-panel-header>
        </v-expansion-panel>

      </v-expansion-panels>

    </v-sheet>
  </div>
</template>

<script lang="ts">
import {i18nDictionary} from "@/i18n/Keys";

export default {
  name: "EntryEditor",
  props: [
      'layoutBtnContent',
      'index'
  ],
  data() {
    return {
      i18nDictionary: i18nDictionary,
      panels: [0, 1]
    }
  }
}
</script>

<style scoped>

</style>