import Cursor from "./Cursor";

document.addEventListener('DOMContentLoaded', ()=>{
    new Editor();
})

type Chapter = {
    Level: number
    Title: string
}

class Editor {

    private project: string;

    private editArea: HTMLElement;

    private log: HTMLElement;

    private sidebar: HTMLElement;

    private pdfArea: HTMLElement;

    constructor() {
        this.project = new URLSearchParams(window.location.search).get('project');

        this.sidebar = document.querySelector('#sidebar');
        this.editArea = document.querySelector('#editArea_editable');

        this.pdfArea = document.querySelector('#pdfArea');

        this.editArea.addEventListener('keypress', (e)=>{
            if( e.key === 'Enter' ) {
                e.preventDefault();
                let pos = Cursor.getCurrentCursorPosition(this.editArea);

                if(pos > -1) {
                    let file = this.editArea.innerText.substring(0,pos) + '\n' + this.editArea.innerText.substring(pos);

                    this.editArea.innerHTML = this.parseContent(file);

                    Cursor.setCurrentCursorPosition(pos+1, this.editArea)
                }
            }
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

        document.querySelector('#view').addEventListener('click', ()=>{
            this.pdfArea.classList.toggle('opened');
            this.pdfArea.querySelector('iframe').src = '/getPDF?project='+ this.project;
        })

        document.querySelector('#quote').addEventListener('click', ()=>{
            let pos = Cursor.getCurrentCursorPosition(this.editArea);

            if(pos > -1) {
                let file = this.editArea.innerText.substring(0,pos) + '\\citebib{}{}{}' + this.editArea.innerText.substring(pos);

                this.editArea.innerHTML = this.parseContent(file);
            }
        })
    }

    private liBlueprint = '<li class="mdc-deprecated-list-item CLASS" id="CONTENT"><span class="mdc-deprecated-list-item__ripple"></span><span class="mdc-deprecated-list-item__text">CONTENT</span></li>'

    private chaptersToSidebar(file: string) {

        let cmdRegex1 = /\\(part|section|subsection|subsubsection|parargaph|subparagraph){.*}/g;

        let commands = file.match(cmdRegex1);

        let chapters: Chapter[] = [];

        commands.forEach(c => {
            if( c.indexOf('\\part') == 0 ) {
                chapters.push({
                    Level: 1,
                    Title: this.extractTitle(c)
                });
            } else if( c.indexOf('\\section') == 0 ) {
                chapters.push({
                    Level: 2,
                    Title: this.extractTitle(c)
                });
            }else if( c.indexOf('\\subsection') == 0 ) {
                chapters.push({
                    Level: 3,
                    Title: this.extractTitle(c)
                });
            }else if( c.indexOf('\\subsubsection') == 0 ) {
                chapters.push({
                    Level: 4,
                    Title: this.extractTitle(c)
                });
            }else if( c.indexOf('\\paragraph') == 0 ) {
                chapters.push({
                    Level: 5,
                    Title: this.extractTitle(c)
                });
            }else if( c.indexOf('\\subparagraph') == 0 ) {
                chapters.push({
                    Level: 6,
                    Title: this.extractTitle(c)
                });
            }
        });

        let listContent = '';

        let classes = ['part', 'section', 'subsection', 'subsubsection', 'paragraph', 'subparagraph']

        chapters.forEach(c => {
            let copy = this.liBlueprint;
            copy = copy.replace('CLASS', classes[c.Level-1])
            copy = copy.replaceAll('CONTENT', c.Title);
            listContent += copy;
        });

        document.querySelector('#sidebar ul').innerHTML = listContent;

        Array.from(document.querySelector('#sidebar ul').children).forEach(el => {
            const c = el.id;
            el.addEventListener('click', ()=>{
                let cp = this.editArea.innerText.indexOf(c);

                Cursor.setCurrentCursorPosition(cp, this.editArea)
                this.editArea.focus();
                Cursor.scrollSelectionIntoView();
            })
        })
    }

    private extractTitle(chapter: string): string {
        return chapter.substring(chapter.indexOf('{')+1, chapter.indexOf('}'))
    }

    private unparseFile(styled: string): string {

        let file = styled.replaceAll('<span class="command">', '')

        file = file.replaceAll('<span class="command comment">', '')

        file = file.replaceAll('</span>', '');

        return file;
    }

    private compileFile() {
        let file = this.unparseFile(this.editArea.innerHTML);

        this.log.innerText = 'Compiling...';

        fetch('saveAndCompile?project='+this.project, {
            method: 'POST',
            body: file
        }).then(resp=>resp.json()).then(data => {
            console.log(data);
            this.log.innerText = data.Log;
            this.log.scrollTop = this.log.scrollHeight;

            if( this.pdfArea.classList.contains('opened') ) {
                this.pdfArea.querySelector('iframe').contentWindow.location.reload();
            }
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

        this.chaptersToSidebar(file);

        let cmdRegex1 = /\\[a-zA-Z%]+/gm;

        let commands = file.match(cmdRegex1).sort()
            .filter(function(element, index, array) {
                return index == array.indexOf(element);
            });

        commands.forEach(c => {
            if( file.charAt(file.indexOf(c) - 1) === `\\` ) {
                file = file.substring(0, file.indexOf(c) - 1) + `<span class="command">\\\\</span>` + file.substr(file.indexOf(c)+1);
            } else {
                file = file.replaceAll(c, '<span class="command">'+c+'</span>')
            }

        });

        let commentRegex1 = /%.*\n/g;

        let comments = file.match(commentRegex1).sort()
            .filter(function(element, index, array) {
                return index == array.indexOf(element);
            });

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