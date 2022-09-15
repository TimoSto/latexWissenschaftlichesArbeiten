<template>
  <v-dialog v-model="opened" width="500">
    <v-card>
      <v-card-title class="text-h5" v-if="dialogTitle.length > 0">
        {{dialogTitle}}
      </v-card-title>

      <v-card-text style="white-space: pre" v-html="dialogContent">
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            text
            @click="$emit('no')"
        >
          Nein
        </v-btn>
        <v-btn
            color="primary"
            text
            @click="$emit('yes')"
        >
          Ja
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Confirm-Dialog",
  props: [
      'model',
      'dialogContent',
      'dialogTitle'
  ],
  computed: {
    opened() {
      return this.model;
    }
  }
});
</script>

<style scoped>

</style>