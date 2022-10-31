<template>
  <v-dialog v-model="opened" width="350">
    <v-card>
      <v-card-title>Es liegen ungespeicherte Änderungen vor</v-card-title>
      <v-card-text>Wenn du fortfährst, gehen diese unwiderruflich verloren.</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" @click="$emit('closed')">{{$t(i18nDictionary.Common.Abort)}}</v-btn>
        <v-btn text color="primary" @click="callback">Fortfahren</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "../i18n/Keys";

export interface InterruptNavigationCallback {
  Type: string,
  Args: string[]
}

export default Vue.extend({
  name: "UnsavedChangesDialog",
  data() {
    return {
      i18nDictionary: i18nDictionary,
      callback: () => {/*to be changed from App.vue*/}
    }
  },
  props: ['open'],
  computed: {
    opened: {
      get(): boolean {return this.open;},
      set() {this.$emit('closed')}
    }
  },
  methods: {
    setCallback(cb: () => void) {
      this.callback = cb;
    }
  }
})
</script>

<style scoped>

</style>