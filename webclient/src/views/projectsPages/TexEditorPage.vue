<template>
  <div id="texEditor">
    <v-app-bar
        dense
        color="background"
        elevate-on-scroll
        scroll-target="#editor-scroll"
        style="z-index: 100"
    >
      <v-toolbar-title>TeX Editor - <i>{{fileName}}</i></v-toolbar-title>
    </v-app-bar>

    <v-sheet class="content-below-two-bars" id="editor-scroll">

    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TexEditorPage",
  computed: {
    fileName(): string {
      return 'test.tex'
    }
  }
})
</script>

<style scoped>

</style>