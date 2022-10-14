<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      clipped-left
      elevation="0"
    >

      <v-app-bar-nav-icon />

      <v-toolbar-title>ThesorTeX</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>

<style lang="scss" scoped>
.v-app-bar{
  &.primary * {
    color: var(--v-primaryText-base)!important;
  }
}
</style>
