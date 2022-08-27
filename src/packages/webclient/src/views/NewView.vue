<template>
  <div style="padding: 8px;">
    <v-text-field v-model="projectName" label="Projektname" filled style="width: 250px">
      <template v-slot:append>
        <v-btn icon :disabled="projectName.length === 0" @click="save"><v-icon>mdi-content-save</v-icon></v-btn>
      </template>
    </v-text-field>
  </div>
</template>

<script>
import Vue from "vue";
import {ActionTypes} from "@/store/action-types";

export default Vue.extend({
  name: "New-View",
  data() {
    return {
      projectName: ''
    }
  },
  methods: {
    save() {
      this.$store.dispatch(ActionTypes.CREATE_PROJECT, this.projectName)
    }
  }
})
</script>

<style scoped>

</style>