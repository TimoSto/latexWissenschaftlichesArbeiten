<template>
  <div>
    <v-container>
      <v-row>
        <v-col
            cols="16"
            sm="8"
            md="4"
        >
          <v-text-field v-model="projectName" label="Projektname" filled>
            <template v-slot:append>
              <v-btn icon :disabled="projectName.length === 0" @click="save"><v-icon>mdi-content-save</v-icon></v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
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