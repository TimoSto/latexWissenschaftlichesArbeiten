<template>
  <div id="editArea" contenteditable="true" @input="handleKeyDown($event)">
    <div class="line"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Edit-Area",
  methods: {
    handleKeyDown(e: KeyboardEvent) {
      if( e.key === 'Enter' ) {
        let sel = window.getSelection();
        let range;
        if (sel && sel.focusNode && sel.focusNode.parentNode) {
          sel.focusNode.parentNode.insertBefore(this.createLine(), sel.focusNode.nextSibling)
        }
      }
    },
    createLine() {
      let line = document.createElement('div');
      line.classList.add('line');
      return line;
    }
  }
});
</script>

<style scoped lang="scss">
#editArea{
  display: inline-block;
  border: 1px black solid;
  font-family: "Consolas", "Monaco", "Courier New", monospace;
  counter-reset: line;
  width: 100%;
  height: 100%;
  padding-left: 0;
  margin-left: 0;
  z-index: 1;
  color: var(--v-accent-base);
  background-color: var(--v-background-base);
  overflow-y: auto;
  
  & .line{
    display: block;
    counter-increment: line;
    text-align: left;
    margin: 0px;
    z-index: 2;
    outline: none;
    position: relative;
    padding-left: 45px;

    &:before {
      display: inline-block;
      width: 40px;
      height: 100%;
      border-right: 1px black solid;
      padding-right: 5px;
      content: counter(line);
      color: var(--v-accent-lighten3);
      background-color: var(--v-background-base);
      text-align: left;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
    }
  }
}
</style>