<template>
  <v-dialog v-model="opened" width="500">
    <v-card>
      <v-card-title class="text-h5">
        Es ist ein Fehler aufgetreten
      </v-card-title>

      <v-card-text>
        {{message}}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            text
            @click="$emit('close')"
        >
          Schließen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Error-Dialog",
  props: [
      'message'
  ],
  computed: {
    opened() {
      return this.message.length > 0;
    }
  }
});
</script>

<style scoped>

</style>