<template>
  <div>
    <div class="text-container" id="head">
      <p>Mit dieser Anwendung kannst du das Erstellen von wissenschaftlichen Arbeiten mit LaTeX vereinfachen und managen. Im linken Bereich sind alle deine Projekte aufgelistet. Dort kannst du sie zur Bearbeitung auswählen oder löschen.
        Du kannst den Bereich über den Button oben links öffnen oder schließen. In einem solchen Projekt wird eine TeX-Datei generiert, inklusive von Style-Definitionen. Diese Style-Integrationen umfassen folgende Bereiche:</p>
    </div>
    <v-list two-line>
      <v-list-item v-for="(stypackage, i) in packages" :key="i">
        <v-list-item-content>
          <v-list-item-title>
            {{stypackage[0]}}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{stypackage[1]}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div class="text-container">
      <p>Um Literatur-Einträge in einem Projekt zu erstellen, musst du das Projekt bearbeiten. Dann erscheint ein Bereich, in dem du Literatureinträge hinzufügen, löschen oder bearbeiten kannst.</p>
      <p>Wenn du noch Fragen hast, schau doch unter der Hilfe <v-icon>mdi-help-circle-outline</v-icon> oder in der <router-link style="text-decoration: none" to="/pdf/documentation">Dokumentation <v-icon color="primary">mdi-book-open-blank-variant</v-icon></router-link> nach.</p>
      <p>Als Sahnehäubchen beinhaltet dieses Tool auch eine Vorlage, für einen schön <router-link to="/pdf/cv">gestylten Lebenslauf</router-link>. Um diese herunterzuladen, klicke <a href="/cv?type=tex" download="CVTemplate.tex">hier</a>.</p>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Welcome-View',

    components: {

    },

    data: ()=>{
      return {
        packages: [
          ['Überschriften', 'PFAD_ZUM_PROJECT/styPackages/ueberschriften.sty'],
          ['Inhaltsverzeichnis', 'PFAD_ZUM_PROJECT/styPackages/inhaltverzeichnis.sty'],
          ['Header/Footer', 'PFAD_ZUM_PROJECT/styPackages/header_footer.sty'],
          ['Abkürzungsverzeichnis', 'PFAD_ZUM_PROJECT/styPackages/abk_verzeichnis.sty'],
          ['Literaturverzeichnis/Zitate', 'PFAD_ZUM_PROJECT/styPackages/literatur.sty'],
          ['Anhang', 'PFAD_ZUM_PROJECT/styPackages/anhang.sty'],
          ['Codes', 'PFAD_ZUM_PROJECT/styPackages/codes.sty'],
          ['HTML/CSS/JAVASCRIPT/JSON', 'PFAD_ZUM_PROJECT/styPackages/html.sty']
        ]
      }
    },
    methods: {

    }
  })
</script>

<style lang="scss" scoped>
@import "../styles/fixesForDark";

.text-container{
  padding: 8px 0px 0px 8px;
}
#head{
  & p {
    margin: 0;
  }
}
</style>