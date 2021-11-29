
class MyShell {

    private _res1: HTMLIFrameElement;
    private _res2: HTMLIFrameElement;

    private _titleElement: HTMLElement;
    private _backBtn: HTMLElement;

    constructor() {
        document.addEventListener('DOMContentLoaded', ()=>{
           let urlFrag = window.location.hash.substr(1);
           this._res1 = document.querySelector('#res_1');
           this._res2 = document.querySelector('#res_2');
           this._titleElement = document.querySelector('.mdc-top-app-bar__title');
            this._backBtn = document.querySelector('.mdc-top-app-bar button');
            this._backBtn.addEventListener('click', ()=>{
                this.NavBack();
            })

           this._res1.src = urlFrag;

            window.history.replaceState(null, urlFrag, location.protocol + '//' + window.location.host + "/" + urlFrag);
        });
    }

    NavBack(){
        this._res2.parentElement.classList.remove('res_container--open')
        this._res2.parentElement.classList.add('res_container--close')
        this._res1.parentElement.classList.remove('res_container--close')
        this._res1.parentElement.classList.add('res_container--open')
        this._backBtn.style.display = 'none';

        window.history.replaceState(null, 'overview', location.protocol + '//' + window.location.host + '/overview');
    }

    setTitle(title: string) {
        this._titleElement.innerText = title;
    }

    NavigateToType(type: string) {
        this._res1.parentElement.classList.remove('res_container--open')
        this._res1.parentElement.classList.add('res_container--close')
        this._res2.src = '/type/' + type;
        this._res2.parentElement.classList.add('res_container--open')
        this._backBtn.style.display = '';

        window.history.replaceState(null, type, location.protocol + '//' + window.location.host + '/type/' + type);
    }

    NavigateToEntry(index: number) {
        this._res1.parentElement.classList.remove('res_container--open')
        this._res1.parentElement.classList.add('res_container--close')
        this._res2.src = '/entry/' + index;
        this._res2.parentElement.classList.add('res_container--open')
        this._backBtn.style.display = '';
        window.history.replaceState(null, "Eintrag", location.protocol + '//' + window.location.host + '/entry/' + index);
    }
}

(<any>window).shell = new MyShell();