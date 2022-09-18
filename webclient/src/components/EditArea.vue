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
  width: 100%;
  & .line{
    height: 30px;
    font-size: 20px;
    width: 100%;
    counter-increment: line;

    &:before {
      content: counter(line);
      display: inline-block;
      border-right: 1px solid #ddd;
      padding: 0 .5em;
      margin-right: .5em;
      color: #888
    }
  }
}
</style>