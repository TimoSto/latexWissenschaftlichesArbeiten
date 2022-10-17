<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th>Schlüssel</th>
        <th>Kategorie</th>
        <th>Eintrag Literaturverzeichnis</th>
        <th style="width: 48px">
          <v-btn icon>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </th>
      </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tiemann.2022</td>
          <td>CitaviInbookDoi</td>
          <td>Tiemnn, Josf (2013), Was soll der Möppes denn, in: Darmstatter darmen, Darmstadt. Hosenbund-Verlag e.V.</td>
        </tr>
      </tbody>
    </template>

  </v-simple-table>
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "../i18n/Keys";

export default Vue.extend({
  name: "EntryTable",

  data() {
    return {
      i18nDictionary: i18nDictionary,
      headers: [
        {
          text: 'Schlüssel'
        },
        {
          text: 'Typ'
        },
        {
          text: 'Eintrag Literaturvezeichnis'
        },
        {
          actions: ['mdi-plus', 'mdi-content-save']
        }
      ]
    }
  }
})
</script>

<style scoped>

</style>