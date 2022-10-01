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
          <v-btn text color="primary" :disabled="selectedBackupPathIndex == -1" v-if="backupPaths != null">{{$t(i18nDictionary.LOAD_BACKUP_LOAD)}}</v-btn>
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
      selectedBackupPathIndex: -1
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
    }
  },

  computed: {
    backupPaths(): string[] {
      return this.$store.state.project.backupPaths
    },
  }
});
</script>

<style scoped>

</style>