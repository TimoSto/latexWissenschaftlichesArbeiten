import Shell from "./Shell";

export default class ShellView {

    private _shell: Shell;
    private _res1: HTMLIFrameElement;
    private _res2: HTMLIFrameElement;

    private _titleElement: HTMLElement;
    private _backBtn: HTMLElement;

    setShell(shell: Shell) {
        this._shell = shell;
        document.addEventListener('DOMContentLoaded', ()=>{
            let urlFrag = window.location.hash.substr(1);
            this._res1 = document.querySelector('#res_1');
            this._res2 = document.querySelector('#res_2');
            this._titleElement = document.querySelector('.mdc-top-app-bar__title');
            this._backBtn = document.querySelector('.mdc-top-app-bar button');
            this._backBtn.addEventListener('click', ()=>{
                //this.NavBack();
            });

            this._res1.src = urlFrag;

            window.history.replaceState(null, urlFrag, location.protocol + '//' + window.location.host +  urlFrag);
        });
    }
}