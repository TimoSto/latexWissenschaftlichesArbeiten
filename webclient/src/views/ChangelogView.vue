<template>
  <div style="padding: 8px 16px;">
    <div v-for="v in versions" :key="v.v">
      <h2>{{v.v}}</h2>
      <ul>
        <li v-for="e in v.e" :key="e">{{e}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangelogView",
  data() {
    return {
      de: [
        {
          v: "Version 1.0.0",
          e: [
              "Vorlage für TeX-Dokument",
              "Eigenes Literatur-System",
              "GUI zum erstellen neuer Einträge",
              "GUI zum Anpassen und Erstellen von Literatrutypen",
              "Citavi-Drag-n-Drop",
              "Lebenslauf-Vorlage"
          ]
        }
      ],
      en: [
        {
          v: "Version 1.0.0",
          e: [
            "Template for TeX-document",
            "Own bibliography-system",
            "GUI for creating entries",
            "GUI for editing bib-types",
            "Citavi-Drag-n-Drop",
            "Template for CV"
          ]
        }
      ]
    }
  },
  computed: {
    versions() {
      if( window.navigator.language === 'de' || window.navigator.language === 'de-DE' ) {
        return this.de
      }
      return this.en;
    }
  }
}
</script>

<style scoped>

</style>