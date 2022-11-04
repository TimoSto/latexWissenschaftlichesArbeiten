<template>
  <div class="line-container">
    <div class="line-index">{{index}}</div>
    <div class="line-editable" contenteditable="true"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TeXEditorLine",
  props: [
      "index"
  ]
})
</script>

<style scoped lang="scss">
.line-container {
  min-width: 100%;
  & .line-index {
    width: 60px;
    text-align: right;
    position: absolute;
    background-color: var(--v-background-base);
    border-right: 1px solid var(--v-accent-lighten2);
    padding-right: 8px;
    box-sizing: border-box;
  }
  & .line-editable {
    white-space: nowrap;
    display: inline-block;
    min-width: calc(100% - 60px);
    margin-left: 60px;
    &:focus-within {
      outline: none;
    }
  }
}
</style>