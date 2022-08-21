<template>
  <div>
    <v-app-bar elevation="0" color="background">
      <v-toolbar-title>Literaturtyp bearbeiten: <span class="font-weight-bold">{{this.$props.name}}</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :disabled="!changesToSave">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main style="overflow-y: scroll; height: calc(100vh - 130px); padding: 0">
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TypeEditor-View",

  props: [
      'name'
  ],

  computed: {
    changesToSave(): boolean {
      return false
    }
  }
});
</script>

<style scoped>

</style>