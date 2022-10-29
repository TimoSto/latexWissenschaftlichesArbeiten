<template>
 <div style="display: flex; flex-flow: column; height: 100%;">
   <v-app-bar
       dense
       color="background"
       elevate-on-scroll
       scroll-target="#sidebar-scroll-target"
       style="flex: 0 1 auto;"
   >

     <v-toolbar-title v-if="!closed">{{title}}</v-toolbar-title>

     <v-spacer v-if="!closed"/>


     <v-btn icon :title="addTitle" @click="$emit('triggerAdd')">
       <v-icon>mdi-plus</v-icon>
     </v-btn>
   </v-app-bar>

   <v-sheet style="flex: 1 1 auto; max-height: 600px; overflow-y: auto" id="sidebar-scroll-target">
      <v-list v-model="model">
<!--        <v-list-item-group v-model="model">-->
          <v-list-item v-for="(item, i) in items" :key="item" @click="toItem(i)">
            <v-list-item-title>{{item}}</v-list-item-title>
          </v-list-item>
<!--        </v-list-item-group>-->
      </v-list>
   </v-sheet>

   <v-bottom-navigation style="flex: 0 1 auto; box-shadow: none">
     <v-btn icon :title="$t(i18nDictionary.App.Information)" v-if="closed" :disabled="model === -1" @click="toInfo">
       <v-icon>mdi-information-outline</v-icon>
     </v-btn>
     <v-btn v-if="!closed" :disabled="model === -1" @click="toInfo">
       {{$t(i18nDictionary.App.Information)}}
       <v-icon>mdi-information-outline</v-icon>
     </v-btn>
   </v-bottom-navigation>
 </div>
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "@/i18n/Keys";

export default Vue.extend({
  name: "SidebarContent",
  data() {
    return {
      i18nDictionary: i18nDictionary,
      model: -1
    }
  },
  watch: {
    model(value: number) {
      this.$emit('modelchange', value)
    }
  },
  props: [
      'closed',
      'title',
      'items',
      'addTitle'
  ],
  methods: {
    toInfo() {
      this.model = -1;
      this.$emit('modelchange', -1);
    },
    toItem(n: number) {
      this.model = n;
      this.$emit('modelchange', n)
    }
  }
});
</script>

<style scoped>

</style>