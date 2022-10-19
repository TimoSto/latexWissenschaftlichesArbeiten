<template>
  <v-dialog v-model="opened" max-width="350">
    <v-card>
      <v-card-title>{{title}}</v-card-title>
      <v-card-text>{{content}}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" @click="$emit('discard')">{{abort}}</v-btn>
        <v-btn text color="primary">{{confirm}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "@/i18n/Keys";

export default Vue.extend({
  name: "ConfirmDialog",
  props: [
      "title",
      "content",
      "open",
      "abort",
      "confirm"
  ],
  data() {
    return {
      i18nDictionary: i18nDictionary
    }
  },
  computed: {
    opened: {
      get(): boolean { return this.open},
      set(v: boolean)  {this.$emit('discard')}
    }
  }
})
</script>

<style scoped>

</style>