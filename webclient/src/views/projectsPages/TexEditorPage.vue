<template>
  <div id="texEditor">
    <v-app-bar
        dense
        color="background"
        elevate-on-scroll
        scroll-target="#editor-scroll"
        style="z-index: 100"
    >
      <v-app-bar-nav-icon @click="$emit('navBack')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>TeX Editor - <i>{{fileName}}</i></v-toolbar-title>
    </v-app-bar>

    <v-sheet class="content-below-two-bars" id="editor-scroll">

      <TeXEditArea />

    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TeXEditArea from "../../components/TeXEditor/TeXEditArea.vue";

export default Vue.extend({
  name: "TexEditorPage",
  components: {TeXEditArea},
  computed: {
    fileName(): string {
      return `${this.$store.state.ProjectView.CurrentProject}.tex`
    }
  }
})
</script>

<style scoped>

</style>