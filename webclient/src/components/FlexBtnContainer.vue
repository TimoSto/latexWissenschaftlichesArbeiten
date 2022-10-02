<template>
  <div class="line" :id="'line-ref-' + i">
    <FlexBtn v-for="action in actions" :key="action.text" :action="action" :text-visible="!childrenLarger && rendered" ref="btns">
    </FlexBtn>
  </div>
</template>

<script>
import FlexBtn from "@/components/FlexBtn";
export default {
  name: "FlexBtnContainer",
  components: {FlexBtn},
  props: ['actions', 'i'],
  data(){
    return {
      childrenLarger: false,
      rendered: false
    }
  },
  mounted(){
    this.$nextTick(()=> {
      setTimeout(()=>{
        const lineElem = document.getElementById('line-ref-' + this.i);
        let childrenWidth = 0;
        lineElem.childNodes.forEach(n => {
          childrenWidth += n.offsetWidth;
        });
        this.childrenLarger =  childrenWidth > lineElem.offsetWidth;
        this.rendered = true;
      }, 0)
    })
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