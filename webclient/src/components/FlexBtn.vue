<template>
  <v-btn color="primary">
    <v-icon>{{action.icon}}</v-icon>
    <span v-if="textVisible">{{action.text}}</span>
  </v-btn>
</template>

<script>
export default {
  name: "FlexBtn",
  props: [
      'action',
      'textVisible'
  ],
  data() {
    return {
      width: 0
    }
  }
}
</script>

<style scoped>

</style>