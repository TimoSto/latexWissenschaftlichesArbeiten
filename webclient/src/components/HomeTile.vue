<template>
  <v-card style="width: 350px; margin: 8px; float: left; background-color: var(--v-background--lighten2)" @click="$emit('clicked')">
    <v-card-title>{{title}}<v-spacer /> <v-icon>{{icon}}</v-icon></v-card-title>
    <v-card-text v-html="content">
    </v-card-text>
  </v-card>

</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Home-Tile",
  props: [
      'title',
      'content',
      'icon'
  ]
})
</script>

<style lang="scss">
a{
  text-decoration: none;
}
</style>