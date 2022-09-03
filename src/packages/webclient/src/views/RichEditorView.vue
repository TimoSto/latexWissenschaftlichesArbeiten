<template>
  <div>
    <v-banner>
      Die Editoren befinden sich noch in der Beta-Phase. Eine saubere Funktionalität ist nicht garantiert!
      <template v-slot:actions="{ dismiss }">
        <v-btn
            text
            color="primary"
            @click="dismiss"
        >
          Verstanden
        </v-btn>
      </template>
    </v-banner>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "RichEditor-View"
})
</script>

<style scoped>

</style>