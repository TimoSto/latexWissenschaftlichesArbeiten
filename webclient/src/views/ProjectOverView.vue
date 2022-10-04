<template>
  <div>

    <v-app-bar dense color="background" elevation="1" elevate-on-scroll style="z-index: 100" scroll-target="#scroll-project">
      <v-toolbar-title>{{projectName}}</v-toolbar-title>

      <v-spacer />

      <v-btn icon :title="$t(i18nDictionary.BACKUP_LOCAL_TT)" @click="backupProject">
        <v-icon>mdi-cloud-upload</v-icon>
      </v-btn>

      <v-btn icon :title="$t(i18nDictionary.RESET_TO_BACKUP)" @click="openBackupDialog">
        <v-icon>mdi-cloud-download</v-icon>
      </v-btn>

      <v-btn icon :title="$t(i18nDictionary.DELETE_PROJECT_TT)" @click="deleteTriggered = true">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-app-bar>

    <v-sheet id="scroll-project" class="content-below-two-bars">

      <v-expansion-panels multiple accordion flat tile>
        <v-expansion-panel>
          <v-expansion-panel-header>{{ $t(i18nDictionary.PROJECT_BIB_ENTRIES) }}</v-expansion-panel-header>
          <v-expansion-panel-content>

            <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
              <v-btn color="primary" style="flex-grow: 1; margin: 8px;" @click="$emit('editor', {Type: 'bibEntry', Key: ''})">
                <v-icon>mdi-plus</v-icon>
                {{$t(i18nDictionary.PROJECT_ADD_ENTRY)}}
              </v-btn>
              <v-btn color="primary" style="flex-grow: 1; margin: 8px;" @click="triggerCiteCleanup" v-if="false">
                <v-icon>mdi-vacuum</v-icon>
                {{$t(i18nDictionary.PROJECT_CLEANUP_CITES)}}
              </v-btn>
            </div>

            <v-list two-line>
              <v-list-item v-for="(el,i) in bibEntries" :key="'entry-' + i" @click="$emit('editor', {Type: 'bibEntry', Key: el.Key})">
                <v-list-item-avatar class="cite-count" :title="$t(i18nDictionary.ENTRY_CITE_COUNT) + el.Key">
                  {{el.CiteNumber}}
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ el.Key }} - {{ el.Typ }}</v-list-item-title>
                  <v-list-item-subtitle>{{ el.Fields[0] }} - {{ el.Fields[1] }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>{{ $t(i18nDictionary.PROJECT_BIB_TYPES) }}</v-expansion-panel-header>
          <v-expansion-panel-content>

            <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
              <v-btn color="primary" style="flex-grow: 1; margin: 8px">
                <v-icon>mdi-star</v-icon>
                {{ $t(i18nDictionary.PROJECT_SET_TYPES_AS_DEFAULT) }}
              </v-btn>
              <v-btn color="primary" style="flex-grow: 1; margin: 8px">
                <v-icon>mdi-reload</v-icon>
                {{ $t(i18nDictionary.PROJECT_REFRESH_DEFAULT) }}
              </v-btn>
              <v-btn color="primary" style="flex-grow: 1; margin: 8px" @click="$emit('editor', {Type:'bibType', Key: ''})">
                <v-icon>mdi-plus</v-icon>
                {{ $t(i18nDictionary.PROJECT_ADD_TYPE) }}
              </v-btn>
            </div>

            <v-list two-line>
              <v-list-item v-for="el in bibTypes" :key="el.Name" ripple two-line style="cursor: pointer" @click="$emit('editor', {Type: 'bibType', Key: el.Name})">
                <v-list-item-content>
                  <v-list-item-title>{{ el.Name }}</v-list-item-title>
                  <v-list-item-subtitle v-html="el.Model"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-sheet>

    <ConfirmDialog
        :model="deleteTriggered"
        :title="$t(i18nDictionary.DELETE_PROJECT_SURE_TITLE)"
        :content="$t(i18nDictionary.DELETE_PROJECT_SURE_CONTENT).replace('%s', this.projectName)"
        :action="$t(i18nDictionary.DELETE)"
        :abort="$t(i18nDictionary.ABORT)"
        @declined="deleteTriggered = false"
        @confirmed="deleteProject"
    />

    <v-dialog v-model="backupResetTriggered" max-width="650">
      <v-card>
        <v-card-title>{{$t(i18nDictionary.LOAD_BACKUP_HEADING)}}</v-card-title>
        <v-card-text v-if="backupPaths != null">
          {{$t(i18nDictionary.LOAD_BACKUP_DESCR)}}
          <v-list>
            <v-list-item-group v-model="selectedBackupPathIndex" color="accent">
              <v-list-item v-for="path in backupPaths" :key="path">
                <v-list-item-title>{{path}}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
        <v-card-text v-if="backupPaths == null">Für dieses Projekt existieren noch keine Backups</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="closeBackupDialog">{{$t(i18nDictionary.CLOSE)}}</v-btn>
          <v-btn text color="primary" :disabled="selectedBackupPathIndex == -1" v-if="backupPaths != null" @click="resetToBackup">{{$t(i18nDictionary.LOAD_BACKUP_LOAD)}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <ConfirmDialog
        :model="citeCleanupTriggered"
        :title="$t(i18nDictionary.PROJECT_CITE_CLEANUP_TITLE)"
        :content="$t(i18nDictionary.PROJECT_CITE_CLEANUP_CONTENT)"
        :action="$t(i18nDictionary.CONTINUE)"
        :abort="$t(i18nDictionary.ABORT)"
        @declined="citeCleanupTriggered = false"
        @confirmed="cleanupCites"
    />

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "@/i18n/Keys";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import {ActionTypes} from "@/store/action-types";
import {BibType} from "../api/bibType/BibType";
import {BibEntry} from "../api/bibEntry/BibEntry";

export default Vue.extend({
  name: "Project-OverView",
  components: {ConfirmDialog},
  props: [
      'projectName'
  ],
  data() {
    return {
      i18nDictionary: i18nDictionary,
      deleteTriggered: false,
      backupResetTriggered: false,
      selectedBackupPathIndex: -1,
      entryActions: [
        {
          icon: 'mdi-plus',
          text: 'Eintrag hinzufügen',
          action: 'addEntry'
        },
        {
          icon: 'mdi-vacuum',
          text: 'Zitate aufräumen',
          action: 'cleanupCites'
        }
      ],
      showLargeEntryBtns: true,
      typeActions: [
        {
          icon: 'mdi-star',
          text: 'Als Standard festlegen',
          action: 'toggleStandard'
        },
        {
          icon: 'mdi-reload',
          text: 'Standard aktualisieren',
          action: 'refreshStandard'
        },
        {
          icon: 'mdi-plus',
          text: 'Typen hinzufügen',
          action: 'addType'
        }
      ],
      showLargeTypeBtns: true,
      citeCleanupTriggered: false
    }
  },

  methods: {
    deleteProject() {
      this.$store.dispatch(ActionTypes.PROJECT_DELETE_PROJECT, this.$store.state.app.currentProjectName)
    },
    backupProject() {
      this.$store.dispatch(ActionTypes.PROJECT_BACKUP_PROJECT, this.$store.state.app.currentProjectName)
    },
    openBackupDialog() {
      this.$store.dispatch(ActionTypes.PROJECT_GET_BACKUP_PATHS, this.$store.state.app.currentProjectName)
      this.backupResetTriggered = true;
    },
    closeBackupDialog() {
      this.backupResetTriggered = false;
    },
    resetToBackup() {
      this.$store.dispatch(ActionTypes.PROJECT_RESET_TO_BACKUP, {
        project: this.$store.state.app.currentProjectName,
        backup: this.backupPaths[this.selectedBackupPathIndex]
      });
      this.backupResetTriggered = false;
    },
    triggerCiteCleanup() {
      this.citeCleanupTriggered = true;
    },
    cleanupCites() {
      this.$store.dispatch(ActionTypes.PROJECT_CLEANUP_CITES, this.projectName)
      this.citeCleanupTriggered = false;
    }
  },

  computed: {
    backupPaths(): string[] {
      return this.$store.state.project.backupPaths
    },
    bibTypes(): BibType[] {
      return this.$store.state.project.bibTypes;
    },
    bibEntries(): BibEntry[] {
      return this.$store.state.project.bibEntries;
    }
  },
});
</script>

<style scoped lang="scss">

</style>