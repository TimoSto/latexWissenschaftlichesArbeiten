<template>
  <div class="d-flex">
    <div class="area" :class="[editorOpen ? 'halfWidth' : 'fullWidth']">
      <ProjectOverView v-on:editType="openEditor($event)"/>
    </div>
    <div class="area" :class="[editorOpen ? 'halfWidth' : 'zeroWidth']">
      <TypeEditorView v-if="TypeEditor.length > 0" :name="TypeEditor" v-on:closeEditor="closeEditor"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import ProjectOverView from "@/views/ProjectOverView.vue";
  import TypeEditorView from "@/views/TypeEditorView.vue";

  export default Vue.extend({
    name: 'Project-View',

    components: {
      TypeEditorView,
      ProjectOverView

    },

    data() {
      return {
        TypeEditor: ''
      }
    },

    computed: {
      editorOpen() {
        return this.$data.TypeEditor.length > 0
      }
    },

    methods: {
      openEditor(evt: string) {
        this.TypeEditor = evt
      },
      closeEditor() {
        this.TypeEditor = '';
      }
    }
  })
</script>

<style lang="scss" scoped>
.area {
  transition: width 0.4s ease-in-out;
  min-width: 0;
  &.fullWidth{
    width: 100%;
  }
  &.halfWidth{
    width: 50%;
  }
  &.zeroWidth {
    width: 0;
  }
}
</style>