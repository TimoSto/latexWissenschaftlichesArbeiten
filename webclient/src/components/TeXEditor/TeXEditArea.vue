<template>
  <div class="outer-container">
    <div class="index-container">
      <div class="line-number">1</div>
      <div class="line-number">1</div>
    </div>
    <div class="lines-container">
      <div class="inner-container">
        <TeXEditorLine index="1"/>
        <TeXEditorLine index="2"/>
      </div>
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
  & .index-container {
    width: 60px;
    float: left;
    height: 100%;
    & .line-number {
      width: 100%;
      padding-right: 8px;
      box-sizing: border-box;
      display: inline-block;
      text-align: right;
    }
  }
  & .lines-container {
    overflow-x: auto;
    width: calc(100% - 60px);
    float: left;
    & .inner-container {
      width: auto;
      display: inline-block;
      min-width: 100%;
      border: 1px solid red;
    }
  }
}
</style>