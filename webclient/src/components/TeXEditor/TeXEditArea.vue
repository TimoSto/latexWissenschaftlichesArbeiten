<template>
  <div class="outer-container">
    <div class="index-container">
      <div class="line-number"
           v-for="(_, i) in lines"
           :key="`line-num-${i}`"
      >{{i}}</div>
    </div>
    <div class="lines-container">
      <div class="inner-container">
        <TeXEditorLine
            v-for="(l, i) in lines"
            :key="`line-${i}`"
            :index="i"
            :initialValue="l"
            v-on:valueChange="onValueChange(i, $event)"
            v-on:newline="addLine(i)"
            v-on:lineUp="focusLine(i-1)"
            v-on:lineDown="focusLine(i+1)"
            ref="lineElement"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TeXEditorLine, {TeXEditorLineInterface} from "./TeXEditorLine.vue";
export default Vue.extend({
  name: "TeXEditArea",
  components: {TeXEditorLine},
  data() {
    return {
      lines: [
          'hallo',
          'du',
          ''
      ] as string[]
    }
  },
  methods: {
    onValueChange(index: number, value: string) {
      this.lines[index] = value;
    },
    addLine(index: number) {
      this.lines.splice(index + 1, 0, '');
      this.focusLine(index + 1);
    },
    focusLine(index: number) {
      if(index < 0 || index >= this.lines.length) {
        return;
      }
      if( this.$refs.lineElement ) {
        (this.$refs.lineElement as TeXEditorLineInterface[])[index].focus()
      }
    }
  }
})
</script>

<style scoped lang="scss">
.outer-container {
  width: calc(100% - 16px);
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid var(--v-accent-lighten1);
  overflow: auto;
  & .index-container {
    width: 60px;
    float: left;
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid var(--v-accent-lighten1);
    & .line-number {
      width: 100%;
      padding-left: 8px;
      box-sizing: border-box;
      display: inline-block;
      text-align: left;
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
    }
  }
}
</style>