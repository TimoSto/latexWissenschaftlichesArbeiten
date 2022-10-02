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

#pages {
  transition: width .25s ease-in-out;
}

#editor {
  flex-grow: 1;
}

.editor-closed {
  & #pages {
    width: 100%;
  }
}

.editor-opened {
  & #pages {
    width: 50%;
  }
}

</style>