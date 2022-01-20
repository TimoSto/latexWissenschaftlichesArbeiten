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
                this.NavBack();
            });

            this._res1.src = urlFrag;

            window.history.replaceState(null, urlFrag, location.protocol + '//' + window.location.host +  urlFrag);
        });
    }

    NavigateToType(type: string) {
        this._res1.parentElement.classList.remove('res_container--open')
        this._res1.parentElement.classList.add('res_container--close')
        this._res2.src = '/type/' + type;
        this._res2.parentElement.classList.add('res_container--open')
        this._backBtn.style.display = '';
    }

    NavigateToEntry(key: string) {
        this._res1.parentElement.classList.remove('res_container--open')
        this._res1.parentElement.classList.add('res_container--close')
        this._res2.src = '/entry/' + key;
        this._res2.parentElement.classList.add('res_container--open')
        this._backBtn.style.display = '';
    }

    NavBack(){
        this._res2.parentElement.classList.remove('res_container--open')
        this._res2.parentElement.classList.add('res_container--close')
        this._res1.parentElement.classList.remove('res_container--close')
        this._res1.parentElement.classList.add('res_container--open')
        this._backBtn.style.display = 'none';
    }

    ReloadOverview() {
        this._res1.contentDocument.location.reload();
    }
}