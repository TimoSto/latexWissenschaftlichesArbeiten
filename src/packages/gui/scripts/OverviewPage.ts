



class OverviewPage {

    private _sidebarBtn: HTMLButtonElement;
    private _sidebar: HTMLElement;

    private _mainFrame: HTMLIFrameElement;

    constructor() {
        document.addEventListener('DOMContentLoaded', ()=>{
            this.init();
        })
    }

    private init() {
        this._sidebarBtn = document.querySelector('#open_sidebar');
        this._sidebar = document.querySelector('#sidebar');
        this._sidebarBtn.addEventListener('click', ()=>{
            this._sidebar.classList.toggle('sidebar--open');
        });

        this._mainFrame = document.querySelector('#main-frame');
        this._mainFrame.src = '/welcome';
    }
}

new OverviewPage();