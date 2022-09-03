<template>
  <div>
    <v-app-bar elevate-on-scroll color="background" scroll-target="#scrollr" style="z-index: 100">
      <v-toolbar-title>Editor</v-toolbar-title>
      <v-spacer></v-spacer>

    </v-app-bar>
    <v-sheet style="overflow-y: scroll; height: calc(100vh - 130px); padding: 0" id="scrollr">
      <v-banner sticky>
        <v-icon :style="[ this.$vuetify.theme.dark ? {'color': 'rgba(255,221,0,1)'} : {'color': 'rgba(255,202,10,1)'} ]" slot="icon" size="36">mdi-alert</v-icon>
        Die Editoren befinden sich noch in der Beta-Phase. Eine saubere Funktionalität ist nicht garantiert!
        <template v-slot:actions="{ dismiss }">
          <v-btn
              text
              color="primary"
              @click="dismiss"
          >
            Verstanden
          </v-btn>
        </template>
      </v-banner>

      <editor-content :editor="editor" />

    </v-sheet>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Vue from "vue";

export default Vue.extend({
  name: "RichEditor-View",
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: null,
      value: {
        type: String,
        default: ''
      }
    }
  },

  mounted() {
    this.editor = new Editor({
      content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
      extensions: [
        StarterKit,
      ],
      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML())

        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    })
  },

  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  beforeDestroy() {
    this.editor.destroy()
  },
})
</script>

<style scoped lang="scss">
@import "../styles/fixesForDark.scss";
</style>