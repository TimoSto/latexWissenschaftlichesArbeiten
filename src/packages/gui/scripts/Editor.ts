import Cursor from "./Cursor";

document.addEventListener('DOMContentLoaded', ()=>{
    new Editor();
})

class Editor {

    private project: string;

    private editArea: HTMLElement;

    private log: HTMLElement;

    private sidebar: HTMLElement;

    constructor() {
        this.project = new URLSearchParams(window.location.search).get('project');

        this.sidebar = document.querySelector('#sidebar');
        this.editArea = document.querySelector('#editArea_editable');

        this.editArea.addEventListener('keypress', ()=>{
            let file = this.unparseFile(this.editArea.innerHTML);
            file = this.parseContent(file);

            // let caretOffset = 0;
            //
            // if (window.getSelection) {
            //     var range = window.getSelection().getRangeAt(0);
            //     var preCaretRange = range.cloneRange();
            //     preCaretRange.selectNodeContents(this.editArea);
            //     preCaretRange.setEnd(range.endContainer, range.endOffset);
            //     caretOffset = preCaretRange.toString().length;
            // }

            let offset = Cursor.getCurrentCursorPosition(this.editArea);

            // else if (document.selection && document.selection.type != "Control") {
            //     var textRange = document.selection.createRange();
            //     var preCaretTextRange = document.body.createTextRange();
            //     preCaretTextRange.moveToElementText(element);
            //     preCaretTextRange.setEndPoint("EndToEnd", textRange);
            //     caretOffset = preCaretTextRange.text.length;
            // }

            this.editArea.innerHTML = file;

            Cursor.setCurrentCursorPosition(offset, this.editArea);
            this.editArea.focus();
        })

        this.log = (document.querySelector('#log') as HTMLElement)

        fetch('/getFile?project='+this.project).then(resp => resp.text()).then(file => {

            this.editArea.innerHTML = this.parseContent(file);
        }).then(resp => {

        })

        document.querySelector('#compile').addEventListener('click', ()=>{
            this.compileFile();
        })
    }

    private unparseFile(styled: string): string {

        let file = styled.replaceAll('<span class="command">', '')

        file = file.replaceAll('<span class="command comment">', '')

        file = file.replaceAll('</span>', '');

        return file;
    }

    private compileFile() {
        let file = this.unparseFile(this.editArea.innerHTML);

        fetch('saveAndCompile?project='+this.project, {
            method: 'POST',
            body: file
        }).then(resp=>resp.json()).then(data => {
            console.log(data);
            this.log.innerText = data.Log;
            this.log.scrollTop = this.log.scrollHeight;
        })
    }

    private commandsToReplace = [
        '\\item',
        '\\section',
        '\\subsection',
        '\\subsubsection',
        '\\paragraph',
        '\\subparagraph',
        '\\begin',
        '\\end',
        '\\documentclass',
        '\\usepackage',
        '\\hyphenation',
        '\\renewcommand',
        '\\newcommand',
        '\\mytitle',
        '\\myauthor',
        '\\headheight',
        '\\includepdf',
        '\\frontmatter',
        '\\mainmatter',
        '\\pagenumbering',
        '\\addcontentsline',
        '\\printabbreviations',
        '\\clearpage',
        '\\def',
        '\\makebox',
        '\\listoftables',
        '\\listoffigures',
        '\\plaintitle',
        '\\tableofcontents',
        '\\vspace',
        '\\textbf',
        '\\textit',
        '\\\\',
        '\\hline',
        '\\listofanhang',
        '\\WarningFilter',
        '\\setlength',
        '\\skip',
        '\\footins'
    ]

    private parseContent(file: string):string {

        let cmdRegex1 = /\\[a-zA-Z%]+/gm;

        let commands = file.match(cmdRegex1);

        commands.forEach(c => {
            if( file.charAt(file.indexOf(c) - 1) === `\\` ) {
                file = file.substring(0, file.indexOf(c) - 1) + `<span class="command">\\\\</span>` + file.substr(file.indexOf(c)+1);
            } else {
                file = file.replaceAll(c, '<span class="command">'+c+'</span>')
            }

        });

        let commentRegex1 = /%.*\n/g;

        let comments = file.match(commentRegex1);

        comments.forEach(c => {
            if( file.charAt(file.indexOf(c) - 1)  !== `\\` ) {
                file = file.replaceAll(c, '<span class="command comment">'+c+'</span>')
            }

        });

        // let lastCommentStart = -1;
        // let lastNewline = -1;
        // let lastBackslash = -1;
        // let lastOpenBrace = -1;
        //
        // let inComment = false;
        // let inCommand = false;
        //
        // let openBraces = 0;
        // let openSquareBrackets = 0;
        //
        // let commentPrefix = '<span class="command comment">'
        // let commandPrefix = '<span class="command">'
        //
        // let commandSuffix = '</span>'
        //
        // for( let i = 0 ; i < file.length ; i++ ) {
        //     if( file.charAt(i) == `\\` && !inCommand ) {
        //         lastBackslash = i;
        //         if( file.charAt(i+1) !== '[' && !inComment ) {
        //             inCommand = true;
        //         }
        //     } else if ( file.charAt(i) == `%` ) {
        //         if( !(lastBackslash >= 0 && lastBackslash == i-1) && file.charAt(i-1) !== `>` ) {
        //             lastCommentStart = i;
        //             inComment = true;
        //         }
        //     } else if ( file.charAt(i) == `\n` ) {
        //         if( inComment ) {
        //             file = file.substring(0, lastCommentStart) + commentPrefix + file.substring(lastCommentStart, i) + commandSuffix + file.substring(i);
        //             inComment = false;
        //             i += commentPrefix.length + commandSuffix.length;
        //         } else if (inCommand) {
        //             file = file.substring(0, lastBackslash) + commandPrefix + file.substring(lastBackslash, i) + commandSuffix + file.substring(i);
        //             inCommand = false;
        //             i += commandPrefix.length + commandSuffix.length;
        //         }
        //     } else if (file.charAt(i) === `{` ) {
        //         if( openBraces == 0 ) {
        //             lastOpenBrace = i;
        //         }
        //         openBraces++;
        //     } else if (file.charAt(i) === `}` ) {
        //         openBraces --;
        //         if ( openBraces == 0 ) {
        //
        //         }
        //     }
        // }

        return file;
    }
}