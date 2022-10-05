<template>
  <div>
    <v-container>
      <div id="drop_zone" @dragover.prevent @drop.prevent="readDroppedFile">
        <span class="mdc-typography--body1">Ziehe eine aus Citavi exportierte Bib-Datei hier hinein</span>
      </div>
      <input type="file" id="fileInput" style="display:none"/>
    </v-container>
    <v-dialog max-width="450px" v-model="uploadTriggered">
      <v-card>
        <v-card-title>{{$t(i18nDictionary.PROJECT_UPLOAD_ENTRIES_TITLE)}}</v-card-title>
        <v-card-text>
          {{ $t(i18nDictionary.PROJECT_UPLOAD_ENTRIES_CONTENT_1) }}
          <v-list>
            <v-list-item v-for="e in entriesToUpload" :key="e.Key">
              <v-list-item-title>{{e.Key}} - {{e.Typ}}</v-list-item-title>
            </v-list-item>
          </v-list>
          <div v-if="unknownTypes.length > 0">
            {{ $t(i18nDictionary.PROJECT_UPLOAD_ENTRIES_CONTENT_2) }}
            <v-list-item v-for="e in unknownTypes" :key="e">
              <v-list-item-title>{{e}}</v-list-item-title>
            </v-list-item>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="abort">{{$t(i18nDictionary.ABORT)}}</v-btn>
          <v-btn text color="primary" @click="upload">{{$t(i18nDictionary.UPLOAD)}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import AnalyseDroppedFile from '@/api/citavi/AnalyseDroppedFile';
import Vue from 'vue'
import {i18nDictionary} from "../i18n/Keys";
import {BibEntry} from "../api/bibEntry/BibEntry";
import {ActionTypes} from "../store/action-types";

  export default Vue.extend({
    name: 'DragNDrop-Zone',
    data() {
      return {
        i18nDictionary: i18nDictionary,
        entriesToUpload: [] as BibEntry[],
        uploadTriggered: false,
        unknownTypes: [] as string []
      }
    },
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
            // this.$store.commit(MutationTypes.SET_DRAG_N_DROP_RESULT, {
            //   Valid: false,
            //   Message: 'Die hochgeladene Datei muss eine .bib-Datei sein'
            // });
            return
          }

          const res = AnalyseDroppedFile(reader.result as string, this.$store.state.project.bibTypes);

          this.entriesToUpload = res.Entries;
          this.unknownTypes = res.Unknown;
          //this.$store.commit(MutationTypes.SET_DRAG_N_DROP_RESULT, dragNDropRes);
          this.uploadTriggered = true;
        }
      },
      abort() {
        this.entriesToUpload = [];
        this.unknownTypes = [];
        this.uploadTriggered = false;
      },
      upload() {
        this.$store.dispatch(ActionTypes.PROJECT_UPLOAD_ENTRIES, {entries: this.entriesToUpload, project: this.$store.state.app.currentProjectName});
        this.abort();
      }
    },
  })
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';
#drop_zone{
  width: calc(100% - 20px);
  border: 3px dotted var(--v-accent-lighten4);
  border-radius: 8px;
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