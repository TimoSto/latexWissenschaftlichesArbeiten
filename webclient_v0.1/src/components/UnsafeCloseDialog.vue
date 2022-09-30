<template>
  <v-dialog v-model="opened" width="500">
    <v-card>
      <v-card-title class="text-h5">
        Es liegen ungespeicherte Änderungen vor.
      </v-card-title>

      <v-card-text>
        Möchtest du den Editor wirklich verlassen?
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
  name: "UnsafeClose-Dialog",
  props: [
      'model'
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