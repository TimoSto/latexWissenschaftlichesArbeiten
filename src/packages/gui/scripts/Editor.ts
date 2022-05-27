
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

        let commentResults = file.match(/^(?:%).*/gm)

        commentResults.forEach(res => {
            file = file.replace(res,'<span class="command">'+res+'</span>')
        });

        this.editArea.innerHTML = file;
    }
}