<template>
    <v-card>
      <v-card-title>Hilfe</v-card-title>
      <v-card-text>
        <v-expansion-panels accordion flat hover tile>
          <v-expansion-panel v-for="(question, i) in questions" :key="'q' + i">
            <v-expansion-panel-header><span v-html="question.q" /> </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p v-html="question.a" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TeX-HelpDialog",
  data() {
    return {
      questions: [
        {
          q: 'Was bedeutet <i>TeX-Wert</i> bei den Literaturtypen?',
          a: 'Dieser Wert beschreibt, ob die jeweiligen Attributs-Werte vor den Speichern und der Verwendung in deiner TeX-Datei ins Tex-Format überführt werden sollen. Das bedeutet, Sonderzeichen wie <i>"_"</i> oder <i>"&"</i> werden durch TeX-Befehle ersetzt. Wenn die Option aktiviert ist, passiert das nicht. Dies solltest du z.B. tun, wenn das Attribut eine URL ist und du die Werte im TeX-Format (z.B. <i>{{\\url{https:\\test_url.de}}}</i>) angeben willst.'
        }
      ]
    }
  },
  watch: {
    open(nV) {
      this.opened = nV;
    }
  }
});
</script>

<style scoped>

</style>