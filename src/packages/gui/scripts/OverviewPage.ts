import {MDCMenu} from '@material/menu';
import {MDCMenuSurface} from '@material/menu-surface';
import {MDCDialog} from "@material/dialog/component";

class OverviewPage {

    private _sidebarBtn: HTMLButtonElement;
    private _sidebar: HTMLElement;

    private _mainFrame: HTMLIFrameElement;

    private _editArea: HTMLElement;
    private _editTitle: HTMLElement;
    private _editFrame: HTMLIFrameElement;

    private _version: string;

    constructor() {
        document.addEventListener('DOMContentLoaded', ()=>{
            this._version = document.body.getAttribute('data-version');
            this.init();
            let params = new URLSearchParams(document.location.search);
            let name = params.get("project");
            if (name) {
                this.setMain(`/projects/${name}`);
            }

            this._editTitle = document.querySelector('#editTitle');

            (<any>window).setMain = (uri) => {
                this.setMain(uri);
            }
            (<any>window).setEdit = (uri) => {
                this.setEdit(uri);
            }

            (<any>window).reloadMain = () => {
                this._mainFrame.contentWindow.location.reload();
            }

            document.querySelector('#close_edit').addEventListener('click', ()=>{
                this._editArea.classList.remove('editArea--open');
            })

            document.querySelectorAll('[data-edit-value]').forEach(el => {
                const project = el.getAttribute('data-edit-value');
                el.addEventListener('click', (e)=>{
                    if ((<HTMLElement>e.target).getAttribute('data-delete-value')) return

                    window.location.replace('/overview?project='+project)
                    //this.setMain('/projects/'+project);
                })
            });

            document.querySelectorAll('[data-delete-value]').forEach(el => {
                const project = el.getAttribute('data-delete-value');
                el.addEventListener('click', (e)=>{
                    fetch('/deleteProject?project='+project).then(resp => {
                        if ( resp.status === 200 ) {
                            window.location.reload();
                        }
                    })
                    //this.setMain('/projects/'+project);
                })
            });

            const menu = new MDCMenuSurface(document.querySelector('header .mdc-menu'));
            //menu.setAnchorElement(document.querySelector('.mdc-top-app-bar__section--align-end button'));
            menu.setAnchorCorner(1);

            let open = false;

            menu.listen('MDCMenuSurface:opened', () => {
                open = true;
            });
            menu.listen('MDCMenuSurface:closed', () => {
                open = false;
            });

            document.querySelector('.mdc-top-app-bar__section--align-end .mdc-menu-surface--anchor button').addEventListener('click', ()=>{
                if(!open) {
                    menu.open();
                }
            });

            let dialog = new MDCDialog(document.querySelector('.mdc-dialog'));

            let dialogContents = document.querySelectorAll('.mdc-dialog__content div');
            let dialog_title = <HTMLElement>document.querySelector('.mdc-dialog__title');
            document.querySelectorAll('.mdc-menu li').forEach((el, i) =>{
                const index = i;
                const text = el.querySelector('.mdc-deprecated-list-item__text').innerHTML;
                el.addEventListener('click', ()=>{
                    dialog_title.innerHTML = text;
                    dialogContents.forEach((dc, n) => {
                        (<HTMLElement>dc).style.display = n === index ? 'block' : 'none';
                    });
                    dialog.open()
                    menu.close();
                })
            })
        });

        this._showUpdateDialogIfNecessary()
    }

    private _showUpdateDialogIfNecessary() {
        fetch('https://raw.githubusercontent.com/TimoSto/latexWissenschaftlichesArbeiten/develop/src/packages/conf/VERSION').then(resp => {
            //console.log(resp.status)
            if( resp.status === 200 ) {
                return resp.text();
            }
        }).then(version => {
            if(version != this._version) {
                console.log("UPDATE AVAILABLE")
                const versionmenu = new MDCMenuSurface(document.querySelector('#versionPopup'));

                document.querySelector('#newversion').innerHTML = version;
                document.querySelector('#newversion2').innerHTML = version;
                document.querySelector('#closePopup').addEventListener('click', ()=>{
                    versionmenu.close();
                })

                versionmenu.open();
            }
        })
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

        document.querySelector('#home').addEventListener('click', ()=>{
            this.setMain('/welcome.html');
            window.history.pushState('', 'LaTeX - Wissenschaftliches Arbeiten', '/overview');
        });

        document.querySelector('#documentation').addEventListener('click', ()=>{
            this.setMain('/documentation');
            window.history.pushState('', 'LaTeX - Wissenschaftliches Arbeiten', '/overview');
        });

        this._editArea = document.querySelector('#editArea');
        this._editFrame = document.querySelector('#edit-frame');
    }

    private setMain(uri: string) {
        this._mainFrame.src = uri;
        if(uri === '/documentation') {
            this._editArea.classList.remove('editArea--open');
        }
    }

    private setEdit(uri: string) {
        this._editArea.classList.add('editArea--open')
        this._editFrame.src = uri;
        this._editTitle.innerText = uri.indexOf('/editType') >= 0 ? "Literaturtypen bearbeiten" : 'Literatureintrag bearbeiten';
    }
}

new OverviewPage();