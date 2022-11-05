<template>
  <div class="line-container">
    <div class="line-editable" contenteditable="true" ref="line" @keydown="onInput($event)">{{this.initialValue}}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Cursor from "../../cursor/Cursor";

export interface TeXEditorLineInterface extends Vue{
  focus(caret: number): void
}

export default Vue.extend({
  name: "TeXEditorLine",
  props: [
      "index",
      "initialValue"
  ],
  methods: {
    onInput(e: KeyboardEvent) {
      if( e.key === 'Enter' ) {
        e.preventDefault();
        this.$emit('newline');
      } else if( e.key === 'ArrowUp' ) {
        e.preventDefault()
        this.$emit('lineUp', Cursor.getCurrentCursorPosition(this.$refs.line as HTMLElement));
      } else if( e.key === 'ArrowDown' ) {
        e.preventDefault()
        this.$emit('lineDown', Cursor.getCurrentCursorPosition(this.$refs.line as HTMLElement));
      } else if( e.target ) {
        this.$emit('valueChange', (e.target as HTMLElement).textContent);
      }
    },
    focus(caret: number) {
      Cursor.setCurrentCursorPosition(caret, this.$refs.line as HTMLElement);
      (this.$refs.line as HTMLElement)?.focus();
    }
  },
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
    min-width: 100%;
    &:focus-within {
      outline: none;
    }
  }
}
</style>