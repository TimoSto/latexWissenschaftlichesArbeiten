<template>
  <div class="line">
    <FlexBtn v-for="action in actions" :key="action.text" :action="action" :text-visible="showLarge" v-on:click="$emit(action.action)">
    </FlexBtn>
  </div>
</template>

<script>
import FlexBtn from "@/components/FlexBtn";
export default {
  name: "FlexBtnContainer",
  components: {FlexBtn},
  props: ['actions', 'showLarge'],
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