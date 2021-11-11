
class MyShell {

    private _res1: HTMLIFrameElement;
    private _res2: HTMLIFrameElement;

    private _titleElement: HTMLElement;

    constructor() {
        document.addEventListener('DOMContentLoaded', ()=>{
           let urlFrag = new URLSearchParams(window.location.search).get('page');
           this._res1 = document.querySelector('#res_1');
           this._res2 = document.querySelector('#res_2');
           this._titleElement = document.querySelector('.mdc-top-app-bar__title');

           this._res1.src = '/'+urlFrag;
        });
    }

    setTitle(title: string) {
        this._titleElement.innerText = title;
    }
}

(<any>window).shell = new MyShell();