<template>
  <div style='display: flex' :class='layoutClass'>

    <div id='pages'>
      <ProjectOverView :projectName='projectName' v-on:editor='openEditor($event)'/>
    </div>

    <div id='editor'>
      <TypeEditorView :projectName='projectName'/>
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
          'one-page'
      ]
    }
  },
  
  methods: {
    openEditor(evt: {Type: string, Key: string}) {
      this.$store.commit(MutationTypes.EDITOR_OPEN, evt)
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
}

</style>