<template>
  <div style="height: 100%; display: flex; flex-flow: column">
    <v-app-bar elevate-on-scroll color="background" scroll-target="#scroll1" style="z-index: 100">
      <v-toolbar-title>Projektansicht: <span class="font-weight-bold">{{ projectName }}</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon title="Lokales Backup erstellen">
        <v-icon>mdi-cloud-upload</v-icon>
      </v-btn>
      <v-dialog v-model="dialogOpened" width="450">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" title="Projekt löschen">
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
    <v-sheet style="overflow-y: scroll; height: calc(100vh - 130px); padding: 0" id="scroll1">
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
              <v-btn icon title="Diese Literaturtypen als Standard festlegen">
                <v-icon>mdi-cog-refresh</v-icon>
              </v-btn>
              <v-btn icon title="Standard-Literaturtypen aktualisieren">
                <v-icon>mdi-reload</v-icon>
              </v-btn>
              <v-btn icon title="Literaturtyp hinzufügen" @click="newType">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-toolbar>
            <v-list two-line>
              <v-list-item v-for="bType in bibTypes" :key="bType.Name" ripple two-line style="cursor: pointer" @click="editType(bType.Name)">
                <v-list-item-content>
                  <v-list-item-title>{{ bType.Name }}</v-list-item-title>
                  <v-list-item-subtitle v-html="bType.Model"></v-list-item-subtitle>
                </v-list-item-content>
<!--                <v-list-item-avatar class="avatar-less-margin">-->
<!--                  <v-btn icon>-->
<!--                    <v-icon>mdi-delete</v-icon>-->
<!--                  </v-btn>-->
<!--                </v-list-item-avatar>-->
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header ripple>
            Literatureinträge
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-toolbar elevation="0" dense>
              <v-toolbar-title>Literatureinträge</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon title="Literatureintrag hinzufügen" @click="newEntry">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-toolbar>
            <v-list two-line>
              <v-list-item v-for="bEntry in bibEntries" :key="bEntry.Key" ripple two-line style="cursor: pointer" @click="editEntry(bEntry.Key)">
                <v-list-item-avatar class="cite-count" :title="'Anzahl Zitate ' + bEntry.Key">
                  {{bEntry.CiteNumber}}
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ bEntry.Fields[0] }} - {{ bEntry.Fields[1] }}</v-list-item-title>
                  <v-list-item-subtitle>{{ bEntry.Typ }} - {{ bEntry.Key }}</v-list-item-subtitle>
                </v-list-item-content>

              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-sheet>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import DragNDropZone from "@/components/DragNDropZone.vue";
  import { BibType } from '@/api/bibTypes/BibType';
  import {BibEntry} from "@/api/bibEntries/BibEntry";
  import {ActionTypes} from "@/store/action-types";
  import {MutationTypes} from "@/store/mutation-types";

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
        this.$store.dispatch(ActionTypes.DELETE_PROJECT, this.projectName);
      },

      editType(name: string) {
        if( this.$store.state.initialType.Name == name ) {
          return;
        }

        console.log(this.changesToSaveTypeEditor)
        if( this.changesToSaveEntryEditor ) {
          this.$parent?.$emit('tryClosingEntryWithChangesAndOpenType', name);
        } else if( this.changesToSaveTypeEditor ) {
          this.$parent?.$emit('tryClosingTypeWithChanges', name);
        }else {
          this.$emit('editType', name);
        }
      },

      newType() {
        this.$store.commit(MutationTypes.NEW_TYPE)
      },

      editEntry(key: string) {
        if( key == this.$store.state.initialEntry.Key ) {
          return
        }
        console.log(!this.changesToSaveEntryEditor)
        if( this.changesToSaveEntryEditor ) {
          this.$parent?.$emit('tryClosingEntryWithChanges', key);
        } else if( this.changesToSaveTypeEditor ) {
          this.$parent?.$emit('tryClosingTypeWithChangesAndOpenEntry', key);
        }else {
          this.$emit('editEntry', key);
        }
      },

      newEntry() {
        this.$store.commit(MutationTypes.NEW_ENTRY)
      },
    },

    computed: {
      bibTypes(): BibType[] {
        return this.$store.state.bibTypes;
      },
      bibEntries(): BibEntry[] {
        return this.$store.state.bibEntries;
      },
      changesToSaveTypeEditor(): boolean {
        return JSON.stringify(this.$store.state.initialType) != JSON.stringify(this.$store.state.typeToEdit)
      },
      changesToSaveEntryEditor(): boolean {
        let currentWithoutPreview = JSON.parse(JSON.stringify(this.$store.state.entryToEdit));
        if(currentWithoutPreview.BibPreview) {
          currentWithoutPreview.BibPreview = '';
          currentWithoutPreview.CitePreview = '';
        }

        return JSON.stringify(currentWithoutPreview) !== JSON.stringify(this.$store.state.initialEntry)
      },
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
  padding: 0 !important;
  margin: 0;
}

.avatar-less-margin{
  margin-bottom: 4px!important;
  margin-top: 4px!important;
}

.cite-count{
  border-radius: 48px;
  border-width: 2px;
  border-style: solid;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  @extend .avatar-less-margin;
}

.theme--light .cite-count{
  border-color: var(--v-accent-lighten4);
}

.theme--dark .cite-count{
  border-color: var(--v-accent-darken4);
}

//.v-expansion-panel-content::v-deep .v-expansion-panel-content__wrap {
//  padding: 0 !important;
//}
</style>