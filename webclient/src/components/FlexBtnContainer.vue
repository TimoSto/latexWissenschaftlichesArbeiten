<template>
  <div class="line">
    {{childWidths}}-{{lineWidth}}
    <FlexBtn v-for="action in actions" :key="action.text" :action="action" :text-visible="childWidths < lineWidth" ref="btns">
    </FlexBtn>
  </div>
</template>

<script>
import FlexBtn from "@/components/FlexBtn";
export default {
  name: "FlexBtnContainer",
  components: {FlexBtn},
  props: ['actions'],
  data(){
    return {
      childWidths: 0,
      lineWidth: 0
    }
  },
  mounted() {
    setTimeout(()=> {
      //TODO: check if this works everywhere and constantly
      this.$refs.btns.forEach(b => {
        console.log(b.width)
        this.childWidths += b.width + 16;
      });

      this.lineWidth = this.$el.offsetWidth;
    }, 0);
  },
}
</script>

<style scoped lang="scss">
.line {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  & .v-btn {
    flex-grow: 1;
    margin: 8px;
  }
}
</style>