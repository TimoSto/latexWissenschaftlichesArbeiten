<template>
  <v-dialog v-model="opened" width="300">
    <v-card>
      <v-card-title>{{title}}</v-card-title>
      <v-card-text style="padding-bottom: 0">
        <v-text-field
            filled
          :label="label"
          :rules="rules"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary">{{$t(i18nDictionary.Common.Discard)}}</v-btn>
        <v-btn text color="primary">{{$t(i18nDictionary.Common.Save)}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "../i18n/Keys";

export default Vue.extend({
  name: "NewDialog",
  props: [
      'title',
      'label',
      'rules',
      'open'
  ],
  data() {
    return {
      i18nDictionary: i18nDictionary,
    }
  },
  computed: {
    opened: {
      get(): boolean { return this.$props.open },
      set(v: boolean) { this.$emit('modelChanged', v) }
    }
  }
})
</script>

<style scoped>

</style>