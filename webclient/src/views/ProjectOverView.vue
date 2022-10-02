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

            <FlexBtnContainer :actions="entryActions" i="0">
            </FlexBtnContainer>

          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>{{ $t(i18nDictionary.PROJECT_BIB_TYPES) }}</v-expansion-panel-header>
          <v-expansion-panel-content>

            <FlexBtnContainer :actions="typeActions" i="1">
            </FlexBtnContainer>

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

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "@/i18n/Keys";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import {ActionTypes} from "@/store/action-types";
import FlexBtnContainer from "../components/FlexBtnContainer.vue";

export default Vue.extend({
  name: "Project-OverView",
  components: {FlexBtnContainer, ConfirmDialog},
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
          text: 'Eintrag hinzufügen'
        },
        {
          icon: 'mdi-vacuum',
          text: 'Zitate aufräumen'
        }
      ],
      typeActions: [
        {
          icon: 'mdi-star',
          text: 'Als Standard festlegen'
        },
        {
          icon: 'mdi-reload',
          text: 'Standard aktualisieren'
        },
        {
          icon: 'mdi-plus',
          text: 'Typen hinzufügen'
        }
      ]
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
    }
  },

  computed: {
    backupPaths(): string[] {
      return this.$store.state.project.backupPaths
    },
  }
});
</script>

<style scoped lang="scss">

</style>