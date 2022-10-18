<template>
  <thead>
    <tr>
      <th v-for="h in headers" :key="h.Text" :style="h.Centered ? 'text-align: center': ''">{{h.Text}}</th>
      <th :style="{'width': `${actions.length * 52}px`}">
        <v-btn icon v-for="a in actions" :key="a.Callback" :title="a.Title" @click="$emit('clicked', a.Callback)">
          <v-icon>{{a.Icon}}</v-icon>
        </v-btn>
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
import Vue from "vue";

export interface TableAction {
  Icon: string
  Title: string
  Callback: string
}

export interface TableHeadCell {
  Text: string
  Centered: boolean
}

export default Vue.extend({
  name: "CustomTableHead",

  props: {
    headers: [] as unknown as () => TableHeadCell[],
    actions: [] as unknown as () => TableAction[],
  },
})
</script>

<style scoped>

</style>