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
#drop_zone{
  width: calc(100% - 20px);
  height: 80px;
  border: 2px dashed var(--v-on-background);
  margin: 8px;
  & span{
    width: 100%;
    text-align: center;
    display: block;
    padding-top: 20px;
    color: var(--v-on-background);
    font-weight: bold;
  }
}
</style>