



class OverviewPage {

    private _sidebarBtn: HTMLButtonElement;
    private _sidebar: HTMLElement;

    private _mainFrame: HTMLIFrameElement;

    private _editArea: HTMLElement;
    private _editFrame: HTMLIFrameElement;

    constructor() {
        document.addEventListener('DOMContentLoaded', ()=>{
            this.init();
            let params = new URLSearchParams(document.location.search);
            let name = params.get("project");
            if (name) {
                this.setMain(`/projects/${name}`);
            }

            (<any>window).setMain = (uri) => {
                this.setMain(uri);
            }
            (<any>window).setEdit = (uri) => {
                this.setEdit(uri);
            }

            document.querySelector('#close_edit').addEventListener('click', ()=>{
                this._editArea.classList.remove('editArea--open');
            })

            document.querySelectorAll('[data-edit-value]').forEach(el => {
                const project = el.getAttribute('data-edit-value');
                el.addEventListener('click', ()=>{
                    window.location.replace('/overview?project='+project)
                    //this.setMain('/projects/'+project);
                })
            })
        });
    }

    private init() {
        this._sidebarBtn = document.querySelector('#open_sidebar');
        this._sidebar = document.querySelector('#sidebar');
        this._sidebarBtn.addEventListener('click', ()=>{
            this._sidebar.classList.toggle('sidebar--open');
        });

        this._mainFrame = document.querySelector('#main-frame');
        this._mainFrame.src = '/welcome.html';

        document.querySelector('#new_project').addEventListener('click', ()=>{
            this.setMain('/newProject.html');
        });

        this._editArea = document.querySelector('#editArea');
        this._editFrame = document.querySelector('#edit-frame');
    }

    private setMain(uri: string) {
        this._mainFrame.src = uri;
    }

    private setEdit(uri: string) {
        this._editArea.classList.add('editArea--open')
        this._editFrame.src = uri;
    }
}

new OverviewPage();