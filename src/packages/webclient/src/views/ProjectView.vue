<template>
  <div style="height: 100%; display: flex; flex-flow: column">
    <v-app-bar elevation="0">
      <v-app-bar-title>Projektansicht: <span class="font-weight-bold">{{ projName }}</span></v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-cloud-upload</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main style="flex: 1; overflow-y: auto; max-height: calc(100vh - 120px); padding: 0">
      <DragNDropZone />
      <v-expansion-panels  v-model="panel" multiple accordion flat>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Literaturtypen
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            Hey
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Literatureinträge
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            Ho
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
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
  import DragNDropZone from "@/components/DragNDropZone.vue";

  export default Vue.extend({
    name: 'Project-View',

    components: {
      DragNDropZone

    },

    data() {
      return {
        panel: [1]
      }
    },

    mounted() {
      let elem = document.querySelector('#scroll')
    },

    computed: {
      projName(): string {
        return 'fake'
      }
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