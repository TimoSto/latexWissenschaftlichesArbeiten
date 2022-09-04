<template>
  <div>
    <v-app-bar elevate-on-scroll color="background" scroll-target="#scrollr" style="z-index: 100">
      <v-toolbar-title>Editor</v-toolbar-title>
      <v-spacer></v-spacer>

    </v-app-bar>
    <v-sheet style="overflow-y: scroll; height: calc(100vh - 130px); padding: 0" id="scrollr">
      <span class="beta-label">BETA</span>
      <v-banner sticky v-if="bannerAccepted">
        <v-icon :style="[ this.$vuetify.theme.dark ? {'color': 'rgba(255,221,0,1)'} : {'color': 'rgba(255,202,10,1)'} ]" slot="icon" size="36">mdi-alert</v-icon>
        Die Editoren befinden sich noch in der Beta-Phase. Eine saubere Funktionalität ist nicht garantiert!
        <template v-slot:actions="{ dismiss }">
          <v-btn
              text
              color="primary"
              @click="acceptBanner(dismiss)"
          >
            Verstanden
          </v-btn>
        </template>
      </v-banner>

      <div v-if="editor" class="editorBtns" style="border: 1px solid black">
          <tr>
            <td class="btn-container">
              <v-btn
                  icon
                  @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                <v-icon>mdi-format-bold</v-icon>
              </v-btn>
            </td>
            <td class="btn-container">
              <v-btn
                  icon
                  @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                <v-icon>mdi-format-italic</v-icon>
              </v-btn>
            </td>
            <td>
              <v-select v-model="level" :items="textLevels" style="width: 120px" :menu-props="{offsetY: true}" height="36" dense placeholder="Level" @change="handleLevelChange"/>
            </td>
          </tr>

      </div>
      <editor-content :editor="editor" />

    </v-sheet>
  </div>
</template>

<script lang="ts">
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
      editor: undefined as unknown as Editor,
      value: {
        type: String,
        default: ''
      },
      textLevels: [
          'Text',
          'part',
          'section',
          'subsection',
          'subsubsection',
          'paragraph',
          'subparagraph'
      ],
      level: 'Text'
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

  computed: {
    bannerAccepted(): boolean {
      return window.localStorage.getItem('texThesorEditorAccepted') !== 'true'
    }
  },

  methods: {
    acceptBanner(dismiss: ()=>void) {
      dismiss()
      window.localStorage.setItem('texThesorEditorAccepted', 'true');
    },
    handleLevelChange() {
      console.log(this.level)
      switch (this.level) {
        case 'Text':
          this.editor.chain().focus().setParagraph().run()
          break;
        case 'part':
          this.editor.chain().focus().toggleHeading({ level: 1 }).run();
          break;
        case 'section':
          this.editor.chain().focus().toggleHeading({ level: 2 }).run();
          break;
        case 'subsection':
          this.editor.chain().focus().toggleHeading({ level: 3 }).run();
          break;
        case 'subsubsection':
          this.editor.chain().focus().toggleHeading({ level: 4 }).run();
          break;
        case 'paragraph':
          this.editor.chain().focus().toggleHeading({ level: 5 }).run();
          break;
        case 'subparagraph':
          this.editor.chain().focus().toggleHeading({ level: 6 }).run();
          break;
      }
    }
  },

  beforeDestroy() {
    this.editor.destroy()
  },
})
</script>

<style scoped lang="scss">
@import "../styles/fixesForDark.scss";
@import "../styles/betaLabel.scss";

.editorBtns{
  display: table;
  width: 100%;
  & .btn-container{
    width: 36px;
  }
  & .v-btn.v-btn--icon{
    border-radius: 4px;
    //width: 44px;
    //height: 44px;
    line-height: 44px;
    &.is-active::before{
      content: '';
      background-color: var(--v-accent-lighten4);
      opacity: 0.3;
    }
  }
  & .v-input{
    margin: 0;
    padding: 0;
    & .v-text-field__details {
      display: none;
    }
  }
}
</style>