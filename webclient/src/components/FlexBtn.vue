<template>
  <v-btn color="primary" ref="myBtn" @click="$emit('click')">
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
}
</script>

<style scoped>

</style>