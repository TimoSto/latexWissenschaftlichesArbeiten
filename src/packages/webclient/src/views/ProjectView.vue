<template>
  <div class="d-flex" :class="screenClass">
    <div class="area area-left" :class="[editorOpen ? 'halfWidth' : 'fullWidth']">
      <ProjectOverView v-on:editType="openEditor($event)" v-on:newType="openEditor($event)"/>
    </div>
    <div class="area area-right" :class="[editorOpen ? 'halfWidth' : 'zeroWidth']">
      <TypeEditorView v-if="editorOpen" :name="editorName" v-on:closeEditor="closeEditor"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import ProjectOverView from "@/views/ProjectOverView.vue";
  import TypeEditorView from "@/views/TypeEditorView.vue";
  import {MutationTypes} from "@/store/mutation-types";

  export default Vue.extend({
    name: 'Project-View',

    components: {
      TypeEditorView,
      ProjectOverView

    },

    data() {
      return {
        screenClass: 'half'
      }
    },

    computed: {
      editorOpen() {
        return !!this.$store.state.typeToEdit.Name || this.$store.state.typeToEdit.Name == ''
      },
      editorName() {
        return this.$store.state.typeToEdit.Name
      },
      compScreenClass() {
        return this.$store.state.twoThirdsActive ? 'two-thirds' : 'half';
      }
    },

    methods: {
      openEditor(evt: string) {
        this.$store.commit(MutationTypes.SET_TYPE_TO_EDIT, evt);
      },
      closeEditor() {
        this.$store.commit(MutationTypes.SET_TYPE_TO_EDIT, '');
      }
    },

    watch: {
      compScreenClass (newValue) {
        this.$data.screenClass = newValue;
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
  &.zeroWidth {
    width: 0;
  }
}
</style>
<style lang="scss">
.two-thirds{
  & .area-right.halfWidth{
    width: 70%;
  }
  & .area-left.halfWidth{
    width: 30%;
  }
}
.half{
  & .halfWidth{
    width: 50%;
  }
}
</style>