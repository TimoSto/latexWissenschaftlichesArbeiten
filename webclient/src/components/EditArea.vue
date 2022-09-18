<template>
  <div id="editArea">
    <div class="line" v-for="(line, i) in lines" :key="'line-'+ i" :data-idx="i" contenteditable="true" @keydown.enter="handleEnter" @input="handleInput($event)">{{line}}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Edit-Area",
  data() {
    return {
      lines: [
          "test"
      ]
    }
  },
  methods: {
    handleInput(e: InputEvent) {
      console.log(e.data)
    },
    handleEnter(e: KeyboardEvent) {
      e.preventDefault();
      e.stopPropagation();
      const sel = window.getSelection();
      if ( sel && sel.focusNode ) {
        let element = sel.focusNode as HTMLElement;
        if ( !element.getAttribute && sel.focusNode.parentElement ) {
          element = sel.focusNode.parentElement
        }
        const idx = element.getAttribute('data-idx')
        if ( idx ) {
          this.lines.splice(parseInt(idx) + 1, 0, "")
        }
      }
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
    min-height: 25px;

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