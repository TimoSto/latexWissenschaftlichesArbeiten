<template>
  <div class="d-flex">
    <div class="area" :class="[editorOpen ? 'halfWidth' : 'fullWidth']">
      <ProjectOverView v-on:editType="openEditor($event)"/>
    </div>
    <div v-if="TypeEditor.length > 0" wi></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import DragNDropZone from "@/components/DragNDropZone.vue";
  import { BibType } from '@/api/bibTypes/BibType';
  import {BibEntry} from "@/api/bibEntries/BibEntry";
  import {ActionTypes} from "@/store/action-types";
  import ProjectOverView from "@/views/ProjectOverView.vue";

  export default Vue.extend({
    name: 'Project-View',

    components: {
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
      }
    }
  })
</script>

<style lang="scss" scoped>
.area {
  transition: width 1s linear;
  &.fullWidth{
    width: 100%;
  }
  &.halfWidth{
    width: 50%;
  }
}
</style>