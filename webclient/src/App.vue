<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Title</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" permanent :mini-variant.sync="drawer" clipped>
      <v-list nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main> </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    drawer: false,
    items: [
      {title: 'test', icon: 'mdi-image'}
    ]
  }),
});
</script>
<style lang="scss">
html {
  overflow-y: auto;
}
</style>
