<template>
  <div style="height: 100%; display: flex; flex-flow: column">
    <v-app-bar elevation="0" color="background">
      <v-toolbar-title>Projektansicht: <span class="font-weight-bold">{{ projectName }}</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-cloud-upload</v-icon>
      </v-btn>
      <v-dialog v-model="dialogOpened" width="450">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>Projekt löschen</v-card-title>
          <v-card-text>
            Bist du sicher, dass du das Projekt <b>{{projectName}}</b> unwiderruflich löschen möchtest?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dialogOpened = false">Abbrechen</v-btn>
            <v-btn
                color="primary"
                @click="deleteProject"
            >
              Löschen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <v-main style="overflow-y: scroll; height: calc(100vh - 130px); padding: 0">
      <DragNDropZone />
      <v-expansion-panels  v-model="panel" multiple accordion flat hover tile>
        <v-expansion-panel>
          <v-expansion-panel-header ripple>
            Literaturtypen konfigurieren
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-toolbar elevation="0" dense>
              <v-toolbar-title>Literaturtypen</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-reload</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-cog-refresh</v-icon>
              </v-btn>
            </v-toolbar>
            <v-list two-line>
              <v-list-item v-for="bType in bibTypes" :key="bType.Name" ripple two-line style="cursor: pointer" @click="editType(bType.Name)">
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
            <v-list two-line>
              <v-list-item v-for="bEntry in bibEntries" :key="bEntry.Key" ripple two-line style="cursor: pointer">
                <v-list-item-content>
                  <v-list-item-title>{{ bEntry.Fields[0] }} - {{ bEntry.Fields[1] }}</v-list-item-title>
                  <v-list-item-subtitle>{{ bEntry.Typ }} - {{ bEntry.Key }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import DragNDropZone from "@/components/DragNDropZone.vue";
  import { BibType } from '@/api/bibTypes/BibType';
  import {BibEntry} from "@/api/bibEntries/BibEntry";
  import {ActionTypes} from "@/store/action-types";

  export default Vue.extend({
    name: 'Project-OverView',

    components: {
      DragNDropZone

    },

    data() {
      return {
        panel: [1],
        projectName: '',
        dialogOpened: false
      }
    },

    mounted() {
      this.initProject();
    },

    methods: {

      initProject() {
        this.projectName = window.location.href.split('/').pop() as string;
        this.$store.commit('SET_PROJECT', this.projectName);
        this.$store.dispatch('GET_BIBTYPES');
        this.$store.dispatch('GET_BIBENTRIES');
      },

      deleteProject() {
        console.log('del', this.projectName);
        this.$store.dispatch(ActionTypes.DELETE_PROJECT, this.projectName);
      },

      editType(name: string) {
        this.$emit('editType', name)
      }
    },

    computed: {
      bibTypes(): BibType[] {
        return this.$store.state.bibTypes;
      },
      bibEntries(): BibEntry[] {
        return this.$store.state.bibEntries;
      }
    },

    watch:{
      $route (to, from){
        this.initProject();
      }
    }
  })
</script>

<style lang="scss" scoped>
@import '../styles/fixesForDark';

main.v-content {
  width: 100vw;
  height: calc(100vh - 64px);
  flex-direction: column;
  overflow-y: auto;
  margin-top: 64px;
  padding: 0 !important;
  margin: 0;
}

//.v-expansion-panel-content::v-deep .v-expansion-panel-content__wrap {
//  padding: 0 !important;
//}
</style>