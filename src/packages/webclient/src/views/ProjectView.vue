<template>
  <div class="d-flex">
    <div class="area" :class="[editorOpen ? 'halfWidth' : 'fullWidth']">
      <ProjectOverView v-on:editType="openEditor($event)"/>
    </div>
    <div class="area" :class="[editorOpen ? 'halfWidth' : 'zeroWidth']"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
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