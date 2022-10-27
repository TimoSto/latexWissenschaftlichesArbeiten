<template>
  <div>
    <v-container style="padding-top: 0">
      <div id="drop_zone" @dragover.prevent v-ripple @click="triggerUploadDialog" @drop.prevent="readDroppedFile">
        <span class="mdc-typography--body1">{{$t(i18nDictionary.Projects.Overview.UploadEntries)}}</span>
      </div>
      <input type="file" id="fileInput" style="visibility: hidden" ref="uploadInput" v-on:input="readFileFromInput"/>
    </v-container>
  </div>
</template>

<script lang="ts">
import {i18nDictionary} from "../i18n/Keys";
import Vue from "vue";
import AnalyseFile from "../analyseFile/analyseFile";

export default Vue.extend({
  name: "CitaviDragNDrop",
  data() {
    return {
      i18nDictionary: i18nDictionary
    }
  },

  methods: {
    triggerUploadDialog() {
      (this.$refs.uploadInput as HTMLElement).click();
    },

    async readFileFromInput() {
      const files = (this.$refs.uploadInput as HTMLInputElement).files;
      if( files ) {
        const file = files[0];
        const result = await AnalyseFile(file)
        console.log(result)
      }

    },

    async readDroppedFile(e: DragEvent) {
      const dT = new DataTransfer();
      let file = e.dataTransfer?.files[0]
      if(!file) {
        return
      }
      dT.items.add(file);
      let reader = new FileReader();
      reader.readAsText(dT.files[0], "UTF-8");
      reader.onload = async ()=>{

        const result = await AnalyseFile(dT.files[0])
        console.log(result)
      }
    },
  }
})
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';
#drop_zone{
  width: calc(100% - 20px);
  border: 3px dotted var(--v-accent-lighten4);
  border-radius: 8px;
  height: 80px;
  margin: 0 8px 8px 8px;
  padding: 0 8px;
  display: table;
  cursor: pointer;
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