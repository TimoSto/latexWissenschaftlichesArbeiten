<template>
  <div style='display: flex' :class='layoutClass'>

    <div id='pages'>
      <ProjectOverView :projectName='projectName' v-on:editor='openEditor($event)'/>
    </div>

    <div id='editor'>
      <TypeEditorView :projectName='projectName' v-if="this.$store.state.editor.type === 'bibType'" v-on:toggleTwoThirds="toggleTwoThirds" :layoutBtnContent="layoutBtnContent" v-on:unsafeClose="openUnsafeDialog"/>
      <EntryEditorView v-if="this.$store.state.editor.type === 'bibEntry'" v-on:toggleTwoThirds="toggleTwoThirds" :layoutBtnContent="layoutBtnContent" v-on:unsafeClose="openUnsafeDialog"/>
    </div>

    <v-dialog attach="#editor" max-width="350" v-model="tryUnsaveClose">
      <v-card>
        <v-card-title>Ungespeicherte Änderungen</v-card-title>
        <v-card-text>Es liegen ungespeicherte Änderungen vor. Wenn du fortfährst, gehen diese verloren.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="tryUnsaveClose=false">Abbrechen</v-btn>
          <v-btn text color="primary" @click="closeEditor">Fortfahren</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import ProjectOverView from './ProjectOverView.vue';
import TypeEditorView from './TypeEditorView.vue';
import {MutationTypes} from '../store/mutation-types';
import EntryEditorView from "./EntryEditorView.vue";

export default Vue.extend({
  name: 'Project-View',
  components: {EntryEditorView, TypeEditorView, ProjectOverView},
  props: [
      'projectName'
  ],
  data() {
    return {
      tryUnsaveClose: false
    }
  },

  computed: {
    layoutClass(): string[] {
      return [
          this.$store.state.editor.type !== '' && this.$store.state.editor.key !== '' ? 'editor-opened' : 'editor-closed',
          this.$store.state.app.twoThirdsActive ? 'two-thirds-layout': '',
          'one-page'
      ]
    },
    layoutBtnContent() {
      if( this.$store.state.app.twoThirdsActive ) {
        return [
          '&#189;',
          'Wechsel zu 50:50-Layout'
        ]
      }
      return [
        '&#8532;',
        'Wechsel zu 70:30-Layout'
      ]
    },
  },
  
  methods: {
    openEditor(evt: {Type: string, Key: string}) {
      this.$store.commit(MutationTypes.EDITOR_OPEN, evt)
    },
    toggleTwoThirds() {
      this.$store.commit(MutationTypes.APP_TOGGLE_TWO_THIRDS);
      window.localStorage.setItem('ThesorTeX_twoThirdsLayout', this.$store.state.app.twoThirdsActive)
    },
    openUnsafeDialog() {
      this.tryUnsaveClose = true;
    },
    closeEditor() {
      this.$store.commit(MutationTypes.EDITOR_OPEN, {Type: '', Key: ''});
      this.tryUnsaveClose = false;
    }
  }
});
</script>

<style scoped lang='scss'>

#pages, #editor {
  transition: width .25s ease-in;
}

#editor {
  flex-grow: 1;
  min-width: 0;
  overflow: hidden;
}

.editor-closed {
  & #pages {
    width: 100%;
  }
  & #editor {
    width: 0;
  }
}

.editor-opened {
  & #pages {
    width: 50%;
  }
  & #editor {
    width: 50%;
  }
  &.two-thirds-layout {
    & #pages {
      width: 30%;
    }
    & #editor {
      width: 70%;
    }
  }
}

</style>