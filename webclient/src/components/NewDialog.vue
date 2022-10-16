<template>
  <v-dialog v-model="opened" width="300" @click:outside="closeDialog">
    <v-card id="newDialog">
      <v-card-title>{{title}}</v-card-title>
      <v-card-text style="padding-bottom: 0">
        <v-text-field
            filled
            v-model="value"
          :label="label"
          :rules="rules"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" @click="closeDialog">{{$t(i18nDictionary.Common.Discard)}}</v-btn>
        <v-btn text color="primary" @click="$emit('save', value)" :disabled="calcDisabled">{{$t(i18nDictionary.Common.Save)}}</v-btn>
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
      value: ''
    }
  },
  computed: {
    opened: {
      get(): boolean { return this.$props.open },
      set(v: boolean) { this.$emit('modelChanged', v) }
    },
    calcDisabled(): boolean {

      return this.value.length === 0 || this.rules[0](this.value) !== true
    }
  },

  methods: {
    closeDialog() {
      console.log('close')
      this.$emit('discard');
      this.value = '';
    }
  }
})
</script>

<style scoped>

</style>