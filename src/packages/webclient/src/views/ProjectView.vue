<template>
  <div style="height: 100%; display: flex; flex-flow: column">
    <v-app-bar elevation="0" color="background">
      <v-toolbar-title>Projektansicht: <span class="font-weight-bold">{{ projectName }}</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-cloud-upload</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main style="flex: 1; overflow-y: auto; max-height: calc(100vh - 120px); padding: 0">
      <DragNDropZone />
      <v-expansion-panels  v-model="panel" multiple accordion flat>
        <v-expansion-panel>
          <v-expansion-panel-header ripple>
            Literaturtypen
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list two-line>
              <v-list-item v-for="bType in bibTypes" :key="bType.Name" ripple two-line style="cursor: pointer">
                <v-list-item-content>
                  <v-list-item-title>{{ bType.Name }}</v-list-item-title>
                  <v-list-item-subtitle v-html="bType.Model"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header ripple>
            Literatureinträge
          </v-expansion-panel-header>
          <v-expansion-panel-content>

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
  import { BibType } from '@/api/bibTypes/BibType';

  export default Vue.extend({
    name: 'Project-View',

    components: {
      DragNDropZone

    },

    data() {
      return {
        panel: [1],
        projectName: ''
      }
    },

    mounted() {
      this.projectName = window.location.href.split('/').pop() as string;
      this.$store.commit('SET_PROJECT', this.projectName);
      this.$store.dispatch('GET_BIBTYPES');
    },

    computed: {
      projName(): string {
        return 'fake'
      },
      bibTypes(): BibType[] {
        console.log(this.$vStore.state.bibTypes)
        return this.$store.state.bibTypes

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