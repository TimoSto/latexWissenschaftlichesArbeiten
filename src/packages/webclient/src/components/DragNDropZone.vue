<template>
  <v-container>
    <div id="drop_zone" @dragover.prevent @drop.prevent="readDroppedFile">
      <span class="mdc-typography--body1">Ziehe eine aus Citavi exportierte Bib-Datei hier hinein</span>
    </div>
    <input type="file" id="fileInput" style="display:none"/>
  </v-container>
</template>

<script lang="ts">
import AnalyseDroppedFiles from '@/api/TeX-JSON-converter/AnalyseDroppedFiles';
import Vue from 'vue'
  import AnalyseAndSaveDroppdFile from "../../../gui/scripts/AnalyseAndSaveDroppedFile";
import {MutationTypes} from "@/store/mutation-types";

  export default Vue.extend({
    name: 'DragNDrop-Zone',

    methods: {
      readDroppedFile(e: DragEvent) {
        const dT = new DataTransfer();
        let file = e.dataTransfer?.files[0]
        if(!file) {
          return
        }
        dT.items.add(file);
        let reader = new FileReader();
        reader.readAsText(dT.files[0], "UTF-8");
        reader.onload = ()=>{
          let extension = dT.files[0].name.substr(dT.files[0].name.lastIndexOf('.'))

          if( extension !== '.bib' ) {
            this.$store.commit(MutationTypes.SET_DRAG_N_DROP_RESULT, {
              Valid: false,
              Message: 'Die hochgeladene Datei muss eine .bib-Datei sein'
            });
            return
          }

          const dragNDropRes = AnalyseDroppedFiles(reader.result as string)
          console.log(dragNDropRes)
          this.$store.commit(MutationTypes.SET_DRAG_N_DROP_RESULT, dragNDropRes);
        }
      }
    }
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