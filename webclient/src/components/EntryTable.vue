<template>
  <v-simple-table>
    <template v-slot:default>
      <CustomTableHead
        :headers="headers"
        :actions="actions" />

      <tbody>
        <tr v-for="e in entries" :key="e.Key" @click="$emit('select', e.Key)">
          <td>{{e.Key}}</td>
          <td>CitaviInbookDoi</td>
          <td>Tiemnn, Josf (2013), Was soll der Möppes denn, in: Darmstatter darmen, Darmstadt. Hosenbund-Verlag e.V.</td>
          <td></td>
        </tr>
      </tbody>
    </template>

  </v-simple-table>
  <!--TODO: pagination -->
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "../i18n/Keys";
import {BibEntry} from "../api/bibEntries/Entry";
import CustomTableHead, {TableAction} from "./CustomTableHead.vue";

export default Vue.extend({
  name: "EntryTable",
  components: {CustomTableHead},
  props: {
    entries: [] as unknown as () => BibEntry[],
    headers: [] as unknown as () => string[],
    actions: [] as unknown as () => TableAction[],
  },

  data() {
    return {
      i18nDictionary: i18nDictionary,
    }
  }
})
</script>

<style scoped>

</style>