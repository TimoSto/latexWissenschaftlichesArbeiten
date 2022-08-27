<template>
  <div class="d-flex" :class="screenClass">
    <div class="area area-left" :class="[typeEditorOpen || entryEditorOpen ? 'halfWidth' : 'fullWidth']">
      <ProjectOverView v-on:editType="openTypeEditor($event)" v-on:newType="openTypeEditor($event)" v-on:editEntry="openEntryEditor($event)"/>
    </div>
    <div class="area area-right" :class="[typeEditorOpen || entryEditorOpen ? 'halfWidth' : 'zeroWidth']">
      <TypeEditorView v-if="typeEditorOpen" :name="typeEditorName" v-on:closeEditor="closeTypeEditor"/>
      <EntryEditorView v-if="entryEditorOpen" v-on:closeEditor="closeTypeEditor"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import ProjectOverView from "@/views/ProjectOverView.vue";
  import TypeEditorView from "@/views/TypeEditorView.vue";
  import EntryEditorView from "@/views/EntryEditorView.vue";
  import {MutationTypes} from "@/store/mutation-types";

  export default Vue.extend({
    name: 'Project-View',

    components: {
      TypeEditorView,
      ProjectOverView,
      EntryEditorView
    },

    data() {
      return {
        screenClass: 'half'
      }
    },

    computed: {
      typeEditorOpen() {
        return !!this.$store.state.typeToEdit.Name || this.$store.state.typeToEdit.Name == ''
      },
      typeEditorName() {
        return this.$store.state.typeToEdit.Name
      },
      compScreenClass() {
        return this.$store.state.twoThirdsActive ? 'two-thirds' : 'half';
      },
      entryEditorOpen() {
        return !!this.$store.state.entryToEdit.Key || this.$store.state.entryToEdit.Key == ''
      },
    },

    methods: {
      openTypeEditor(evt: string) {
        this.$store.commit(MutationTypes.SET_TYPE_TO_EDIT, evt);
      },
      closeTypeEditor() {
        this.$store.commit(MutationTypes.SET_TYPE_TO_EDIT, '');
      },
      openEntryEditor(evt: string) {
        this.$store.commit(MutationTypes.SET_ENTRY_TO_EDIT, evt);
        this.$store.commit(MutationTypes.UPDATE_PREVIEW);
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
  transition: width 0.25s ease-in-out;
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