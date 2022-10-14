<template>
 <div style="display: flex; flex-flow: column; height: 100%;">
   <v-app-bar
       dense
       color="background"
       elevate-on-scroll
       scroll-target="#sidebar-scroll-target"
       style="flex: 0 1 auto"
   >

     <v-toolbar-title v-if="!closed">{{title}}</v-toolbar-title>

     <v-spacer v-if="!closed"/>


     <v-btn icon :title="$t(i18nDictionary.App.Information)">
       <v-icon>mdi-plus</v-icon>
     </v-btn>
   </v-app-bar>

   <v-sheet style="flex: 1 1 auto; max-height: 600px; overflow-y: auto" id="sidebar-scroll-target">

   </v-sheet>

   <v-bottom-navigation style="flex: 0 1 auto">
     <v-btn icon :title="$t(i18nDictionary.App.Information)" v-if="closed">
       <v-icon>mdi-information-outline</v-icon>
     </v-btn>
     <v-btn v-if="!closed">
       {{$t(i18nDictionary.App.Information)}}
       <v-icon>mdi-information-outline</v-icon>
     </v-btn>
   </v-bottom-navigation>
 </div>
</template>

<script>
import {i18nDictionary} from "@/i18n/Keys";

export default {
  name: "SidebarContent",
  data() {
    return {
      i18nDictionary: i18nDictionary
    }
  },
  props: [
      'closed',
      'title'
  ]
}
</script>

<style scoped>

</style>