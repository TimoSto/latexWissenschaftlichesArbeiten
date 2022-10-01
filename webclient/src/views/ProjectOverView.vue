<template>
  <div>

    <v-app-bar dense color="background" elevation="1" elevate-on-scroll style="z-index: 100" scroll-target="#scroll-project">
      <v-toolbar-title>{{projectName}}</v-toolbar-title>

      <v-spacer />

      <v-btn icon :title="$t(i18nDictionary.BACKUP_LOCAL_TT)" @click="backupProject">
        <v-icon>mdi-content-save-all</v-icon>
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

  </div>
</template>

<script>
import Vue from "vue";
import {i18nDictionary} from "@/i18n/Keys";
import ConfirmDialog from "@/components/ConfirmDialog";
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
      deleteTriggered: false
    }
  },

  methods: {
    deleteProject() {
      this.$store.dispatch(ActionTypes.PROJECT_DELETE_PROJECT, this.$store.state.app.currentProjectName)
    },
    backupProject() {
      this.$store.dispatch(ActionTypes.PROJECT_BACKUP_PROJECT, this.$store.state.app.currentProjectName)
    },
  }
});
</script>

<style scoped>

</style>