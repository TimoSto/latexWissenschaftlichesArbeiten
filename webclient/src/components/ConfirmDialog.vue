<template>
  <v-dialog v-model="propModel">
    <v-card>
      <v-card-title>{{title}}</v-card-title>
      <v-card-text v-html="content"></v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" @click="$emit('declined')">{{abort}}</v-btn>
        <v-btn text color="primary" @click="$emit('confirmed')">{{action}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Confirm-Dialog",
  props: [
      "title",
      "content",
      "action",
      "abort",
      "model"
  ],
  computed: {
    propModel: {
      get() {
        return this.model
      },
      set(v) {
        this.$emit('updateModel', v)
      }
    }
  }
}
</script>

<style scoped>

</style>