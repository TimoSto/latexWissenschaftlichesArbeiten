<template>
  <div>
    <v-app-bar dense color="background" elevation="1" elevate-on-scroll scroll-target="#scroll-editor" style="z-index: 100">
      <v-toolbar-title>Literatureintrag: <i>{{$store.state.editor.key}}</i></v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="$emit('toggleTwoThirds')" style="font-size: 20px" :title="layoutBtnContent[1]">
        <span v-html="layoutBtnContent[0]" style="color: var(--v-accent-lighten2)"></span>
      </v-btn>
      <v-btn icon :disabled="!saveNecessary">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
    </v-app-bar>

    <v-sheet id="scroll-editor" class="content-below-two-bars">

    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EntryEditor-View",
  props: [
      'layoutBtnContent'
  ],

  computed: {
    saveNecessary(): boolean {
      for( let i = 0 ; i < this.$store.state.project.bibEntries.length ; i++ ) {
        if( this.$store.state.project.bibEntries[i].Name === this.$store.state.editor.key ) {
          return JSON.stringify(this.$store.state.project.bibEntries[i]) !== JSON.stringify(this.$store.state.editor.entryToEdit)
        }
      }
      console.warn('type not found')
      return false
    }
  },
})
</script>

<style scoped>

</style>