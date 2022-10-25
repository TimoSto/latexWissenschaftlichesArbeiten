<template>
  <div>
    <v-container style="padding-top: 0">
      <div id="drop_zone" @dragover.prevent v-ripple @click="triggerUploadDialog">
        <span class="mdc-typography--body1">{{$t(i18nDictionary.Projects.Overview.UploadEntries)}}</span>
      </div>
      <input type="file" id="fileInput" style="visibility: hidden" ref="uploadInput"/>
    </v-container>
  </div>
</template>

<script lang="ts">
import {i18nDictionary} from "../i18n/Keys";
import Vue from "vue";

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
    }
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