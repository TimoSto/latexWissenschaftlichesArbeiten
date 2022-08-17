<template>
  <div style="height: 100%; display: flex; flex-flow: column">
    <v-app-bar elevation="0">
      <v-app-bar-title>Test</v-app-bar-title>
    </v-app-bar>
    <v-main style="flex: 1; background-color: firebrick; overflow-y: auto; max-height: calc(100vh - 120px)">
      <div style="height: 1230px; width: 30px; border: 1px solid black"></div>
    </v-main>
<!--    <v-toolbar fixed dense>-->
<!--      <v-toolbar-title>Teeeeessstt</v-toolbar-title>-->
<!--    </v-toolbar>-->
<!--    <v-sheet id="scroll" class="overflow-y-auto" style="height:600px">-->
<!--      <v-container fluid>-->
<!--        <v-main>-->
<!--          <div style="height: 1234px"></div>-->
<!--        </v-main>-->
<!--      </v-container>-->
<!--    </v-sheet>-->
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Project-View',

    components: {

    },

    mounted() {
      let elem = document.querySelector('#scroll')
    }
  })
</script>

<style lang="scss" scoped>
main.v-content {
  width: 100vw;
  height: calc(100vh - 64px);
  flex-direction: column;
  overflow-y: auto;
  margin-top: 64px;
  padding: 0 !important;
  margin: 0;
}
</style>