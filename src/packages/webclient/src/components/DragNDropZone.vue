<template>
  <v-container>
    <div id="drop_zone">
      <span class="mdc-typography--body1">Ziehe eine aus Citavi exportierte Bib-Datei hier hinein</span>
    </div>
    <input type="file" id="fileInput" style="display:none"/>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'DragNDrop-Zone',

  })
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';
#drop_zone{
  width: calc(100% - 20px);
  border: 3px dotted var(--v-accent-lighten4);
  height: 80px;
  margin: 8px;
  padding: 0 8px;
  display: table;
  & span{
    width: 100%;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    color: var(--v-accent-lighten4);
    font-weight: bold;
  }
}
</style>