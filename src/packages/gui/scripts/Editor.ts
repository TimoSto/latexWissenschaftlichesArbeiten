
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

    private parseContent() {
        let file = this.editArea.innerText;


        this.commandsToReplace.forEach(c => {
            file = file.replaceAll(c, '<span class="command">'+c+'</span>')
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

        this.editArea.innerHTML = file;
    }
}