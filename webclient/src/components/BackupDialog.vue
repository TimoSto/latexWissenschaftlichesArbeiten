<template>
  <v-dialog width="450" v-model="opened">
    <v-card>
      <v-card-title>Projekt auf Backup zurücksetzen</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group v-model="selected">
            <v-list-item v-for="p in paths" :key="p">
              <v-list-item-content>
                <v-list-item-title>{{p}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" @click="$emit('closed')">{{$t(i18nDictionary.Common.Abort)}}</v-btn>
        <v-btn text color="primary" :disabled="selected === -1" @click="resetToBackup">Reset</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "../i18n/Keys";
import ActionTypes from "../store/ActionTypes";

export default Vue.extend({
  name: "BackupDialog",
  props: ['open'],
  watch: {
    open() {
      this.selected = -1;
    }
  },
  data() {
    return {
      selected: -1,
      i18nDictionary: i18nDictionary
    }
  },
  computed: {
    paths(): string[] {
      return this.$store.state.ProjectView.CurrentProjectData.backupPaths;
    },
    opened: {
      get(): boolean {return this.open},
      set(v: boolean) {this.$emit('closed')}
    }
  },
  methods: {
    resetToBackup() {
      this.$store.dispatch(ActionTypes.Projects.Overview.ResetToBackup, {
        project: this.$store.state.ProjectView.CurrentProject,
        backup: this.$store.state.ProjectView.CurrentProjectData.backupPaths[this.selected]
      })
    }
  }
})
</script>

<style scoped>

</style>