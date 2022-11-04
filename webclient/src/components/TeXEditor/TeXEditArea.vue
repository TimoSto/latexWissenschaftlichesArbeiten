<template>
  <div class="outer-container">
    <div class="inner-container">
      <TeXEditorLine index="0"/>
      <TeXEditorLine index="10"/>
    </div>
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
.outer-container {
  width: calc(100% - 16px);
  margin: 0 auto;
  overflow-x: auto;
  & .inner-container {
    width: auto;
    display: inline-block;
    min-width: 100%;
    & .line {
      min-width: 100%;
      border: 1px solid black;
      width: auto;
      height: 40px;
    }
  }
}
</style>