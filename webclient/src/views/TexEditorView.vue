<template>
  <div>
    <div id="editArea"></div>
  </div>
</template>

<script>
import {EditorView, basicSetup} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"

export default {
  name: "TexEditor-View",
  components: {
  },
  mounted() {
    let editor = new EditorView({
      extensions: [basicSetup, javascript()],
      parent: document.getElementById('editArea')
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