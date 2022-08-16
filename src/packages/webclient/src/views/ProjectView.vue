<template>
  <div style="height: 100%">
    <v-toolbar fixed dense>
      <v-toolbar-title>Teeeeessstt</v-toolbar-title>
    </v-toolbar>
    <v-sheet id="scroll" class="overflow-y-auto" max-height="600">
      <v-container fluid>
        <v-main>
          <div style="height: 1234px"></div>
        </v-main>
      </v-container>
    </v-sheet>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Project-View',

    components: {

    }
  })
</script>

<style lang="scss" scoped>
</style>