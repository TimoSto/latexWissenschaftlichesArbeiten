<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>TeXThesor</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" permanent :mini-variant.sync="drawer" clipped>

    </v-navigation-drawer>

    <v-main> </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    drawer: false
  }),
});
</script>
<style lang="scss">
html {
  overflow-y: auto;
}
</style>
