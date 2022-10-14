<template>
  <div>
    <v-app-bar elevation="1" color="background" elevate-on-scroll scroll-target="#scroll-home" style="z-index: 100" dense>
      <v-toolbar-title>{{$t(i18nDictionary.Home.Welcome)}}</v-toolbar-title>
    </v-app-bar>
    <v-sheet class="content-below-two-bars" style="padding: 8px; background-color: var(--v-background-base)" id="scroll-home">
      <p style="margin: 0 8px">{{$t(i18nDictionary.Home.Description)}}</p>
      <div class="tilesContainer">
        <HomeTile v-for="(t,i) in tiles" :key="'tile-'+i" :title="t.Title" :content="t.Content"/>
        <div style="clear:both"></div>
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { i18nDictionary } from '@/i18n/Keys';
import Vue from 'vue';
import HomeTile from "../components/HomeTile.vue";

type Tile = {
  Title: string,
  Href: string,
  Icon: string,
  Content: string
}

export default Vue.extend({
  name: 'Home-View',
  components: {HomeTile},
  data() {
    return {
      i18nDictionary: i18nDictionary,
      tiles: [
        {
          Title: this.$t(i18nDictionary.Home.TemplateCard.Title),
          Content: this.$t(i18nDictionary.Home.TemplateCard.Content)
        },
        {
          Title: 'Literaturmanagement',
          Content: 'In der Vorlage wird ein eigenes System für die Literatur genutzt. Darin kannst du selbst auswählen, welche Attribute im Literaturverzeichnis und in Zitaten wie dargestellt werden sollen. Die Einträge kannst du über diese Anwendung hinzufügen. Ein Import aus Citavi kann ebenfalls aktiviert werden. Die Einträge kannst du in deinem TeX-Dokument über einen Befehl zitieren. Schau am besten mal in der Dokumentation unter dem Kapitel <i>Literatur</i>'
        },
        {
          Title: 'Lebenslauf',
          Content: 'Wenn du mithilfe dieses Tools eine perfekte Abschlussarbeit geschrieben hast, kannst du hier eine Vorlage für einen Lebenslauf herunterladen und dich für deinen nächsten Job bewerben!'
        },
        {
          Title: 'Neue Anforderungen',
          Content: 'Wenn dir eine Funktionalität fehlt oder dir ein Fehler auffällt, lege gern ein Issue im Github-Repository an.'
        }
      ] as Tile[]
    }
  },

  mounted() {
    //this.$store.commit(MutationTypes.APP_SET_PROJECT, '')
  }
})
</script>

