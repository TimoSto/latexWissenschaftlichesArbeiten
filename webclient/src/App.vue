<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      clipped-left
      elevation="0"
    >

      <v-app-bar-nav-icon @click="drawer = !drawer" :disabled="!drawerEnabled"/>

      <v-toolbar-title>ThesorTeX</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" permanent :mini-variant="drawer" clipped>
      <div></div>
    </v-navigation-drawer>

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
    drawer: false,
  }),

  computed: {
    drawerEnabled() {
      return (this.$route.path === '#/' || this.$route.path === '/config');
    },
  }
});
</script>

<style lang="scss" scoped>
.v-app-bar{
  &.primary * {
    color: var(--v-primaryText-base)!important;
  }
}
</style>
