<template>
  <div style='display: flex' :class='layoutClass'>

    <div id='pages'>
      <ProjectOverView :projectName='projectName' v-on:editor='openEditor($event)'/>
    </div>

    <div id='editor'>
      <TypeEditorView :projectName='projectName' v-if="this.$store.state.editor.type === 'bibType'" v-on:toggleTwoThirds="toggleTwoThirds" :layoutBtnContent="layoutBtnContent"/>
    </div>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import ProjectOverView from './ProjectOverView.vue';
import TypeEditorView from './TypeEditorView.vue';
import {MutationTypes} from '../store/mutation-types';

export default Vue.extend({
  name: 'Project-View',
  components: {TypeEditorView, ProjectOverView},
  props: [
      'projectName'
  ],
  data() {
    return {
      //
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