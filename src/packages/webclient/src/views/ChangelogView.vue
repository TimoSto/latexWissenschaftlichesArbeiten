<template>
  <v-sheet style="overflow-y: scroll; height: calc(100vh - 80px); padding: 0;" id="scroll3">
    <div style="padding: 8px">
      <h2>Changelog</h2>
      <div v-for="(v, n) in versions" :key="'v'+n" style="margin: 8px 0">
        <h4>{{v.ver}}</h4>
        <ul>
          <li v-for="(i,ni) in v.issues" :key="'i' + ni + '_' + n">{{i}}</li>
        </ul>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Changelog-View",
  data() {
    return {
      versions: [
        {
          ver: "0.1.0",
          issues: [
              "Vorlage für wissenschaftliches Arbeiten mit Literatur aus CSV",
              "CSV über Web-GUI anpassen",
              "Dokumentation"
          ]
        },
        {
          ver: '1.0.0',
          issues: [
              'Mehrere Projekte managen',
              'Sonderzeichen'
          ]
        },
        {
          ver: '1.1.0',
          issues: [
              'Assert-Dialoge',
              'Citavi-Import',
              'Backups erstellen',
              'CMD-Konfiguration',
              'Errorlog in txt-Datei',
              'Sortierung'
          ]
        },
        {
          ver: '2.0.0',
          issues: [
            'Design-Update mit Umzug nach Vue/Vuetify',
            'Citavi-Import dynamisch steuerbar',
            'Parsen von Sonderzeichen pro Feld deaktivierbar',
          ]
        }
      ],
    }
  }
});
</script>

<style scoped lang="scss">
@import "../styles/fixesForDark.scss";
</style>