<template>
  <div>
    <div id="editArea_o"></div>
    <hr>
    <EditArea />
  </div>
</template>

<script>
import {EditorView, basicSetup} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"
import EditArea from "@/components/EditArea";

export default {
  name: "TexEditor-View",
  components: {
    EditArea
  },
  mounted() {
    let editor = new EditorView({
      extensions: [basicSetup, javascript()],
      parent: document.getElementById('editArea_o')
    })
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>