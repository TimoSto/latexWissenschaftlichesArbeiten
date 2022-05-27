
document.addEventListener('DOMContentLoaded', ()=>{
    new Editor();
})

class Editor {

    private project: string;

    private editArea: HTMLElement;

    private sidebar: HTMLElement;

    constructor() {
        this.project = new URLSearchParams(window.location.search).get('project');

        this.sidebar = document.querySelector('#sidebar');
        this.editArea = document.querySelector('#editArea');

        fetch('/getFile?project='+this.project).then(resp => resp.text()).then(file => {
            this.editArea.innerText = file;

            this.parseContent();
        })
    }

    private parseContent() {
        let file = this.editArea.innerText;

        let lastCommentStart = -1;
        let lastNewline = -1;
        let lastBackslash = -1;
        let lastOpenBrace = -1;

        let inComment = false;
        let inCommand = false;

        let openBraces = 0;
        let openSquareBrackets = 0;

        let commentPrefix = '<span class="command comment">'

        let commandSuffix = '</span>'

        for( let i = 0 ; i < file.length ; i++ ) {
            if( file.charAt(i) == `\\` ) {
                lastBackslash = i;
            } else if ( file.charAt(i) == `%` ) {
                if( !(lastBackslash >= 0 && lastBackslash == i-1) && file.charAt(i-1) !== `>` ) {
                    lastCommentStart = i;
                    inComment = true;
                }
            } else if ( file.charAt(i) == `\n` ) {
                if( inComment ) {
                    file = file.substring(0, lastCommentStart) + commentPrefix + file.substring(lastCommentStart, i) + commandSuffix + file.substring(i);
                    inComment = false;
                    i += commentPrefix.length + commandSuffix.length;
                }
            }
        }

        this.editArea.innerHTML = file;
    }
}