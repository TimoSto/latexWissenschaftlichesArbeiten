<template>
  <div class="editor-container">
    <TeXEditorLine index="1"></TeXEditorLine>
    <TeXEditorLine index="2"></TeXEditorLine>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TeXEditorLine from "./TeXEditorLine.vue";
export default Vue.extend({
  name: "TeXEditArea",
  components: {TeXEditorLine}
})
</script>

<style scoped lang="scss">
.editor-container{
  width: calc(100% - 16px);
  margin: 0 auto;
  overflow-x: auto;
}
</style>