<template>
  <div>
    <div id="editArea">
      <div class="line"
           v-for="(line, i) in lines"
           :key="'line-'+ i"
           :data-idx="i"
           :ref="'line-' + i"
           contenteditable="true"
           @keydown.enter="handleEnter"
           @input="handleInput($event)"
           @focus="handleFocus($event)"
      >{{line}}</div>
    </div>
    <p>{{lines}}</p>
  </div>
</template>

<script lang="ts">
import GetCaretCharacterOffsetWithin from "@/api/editor/GetCaretPosition";
import Vue from "vue";

export default Vue.extend({
  name: "Edit-Area",
  data() {
    return {
      lines: [
          "test"
      ],
      activeLine: 0,
      caretPosition: 0,
      t: false
    }
  },
  updated() {
    let elem = this.$refs['line-' + this.activeLine] as HTMLElement[];
    if ( elem && elem[0] ) {
      elem[0].focus();

      let sel = window.getSelection();
      let range = document.createRange();
      if(sel && range) {
        range.setStart(elem[0].childNodes[0], this.caretPosition);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }

  },
  methods: {
    handleInput(e: InputEvent) {
      const sel = window.getSelection();
      if ( sel && sel.focusNode ) {
        let element = sel.focusNode as HTMLElement;
        if ( !element.getAttribute && sel.focusNode.parentElement ) {
          element = sel.focusNode.parentElement
        }
        const idx = element.getAttribute('data-idx')
        if ( idx ) {
          const i = parseInt(idx)
          this.caretPosition = GetCaretCharacterOffsetWithin(element);

          this.$set(this.lines, i,  element.innerText);

          // let newRange = document.createRange()
          // newRange.setStart(element, range.endOffset)
          // newRange.collapse(true)
          //
          // sel.removeAllRanges()
          // sel.addRange(newRange)
        }
      }
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
          const i = parseInt(idx)
          this.activeLine = i + 1;
          this.caretPosition = 0;
          let range = sel.getRangeAt(0);
          const movedValue = this.lines[i].substring(range.endOffset)
          this.lines[i] = this.lines[i].substring(0, range.endOffset)
          this.lines.splice(i + 1, 0, movedValue);
        }
      }
    },
    handleFocus(e: MouseEvent) {
      const sel = window.getSelection();
      if ( sel && sel.focusNode ) {
        let element = sel.focusNode as HTMLElement;
        if ( !element.getAttribute && sel.focusNode.parentElement ) {
          element = sel.focusNode.parentElement
        }
        const idx = element.getAttribute('data-idx')
        if ( idx ) {
          const i = parseInt(idx)
          this.activeLine = i;
          // let range = sel.getRangeAt(0);
          // this.caretPosition = range.endOffset;
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