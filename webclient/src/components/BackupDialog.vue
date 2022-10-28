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
        <v-btn text color="primary">{{$t(i18nDictionary.Common.Abort)}}</v-btn>
        <v-btn text color="primary" :disabled="selected === -1">Reset</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "../i18n/Keys";

export default Vue.extend({
  name: "BackupDialog",
  props: ['open'],
  data() {
    return {
      selected: -1,
      i18nDictionary: i18nDictionary
    }
  },
  computed: {
    paths(): string[] {
      console.log(this.$store.state.ProjectView.CurrentProjectData.backupPaths)
      return this.$store.state.ProjectView.CurrentProjectData.backupPaths;
    },
    opened: {
      get(): boolean {return this.open},
      set(v: boolean) {this.$emit('closed')}
    }
  }
})
</script>

<style scoped>

</style>