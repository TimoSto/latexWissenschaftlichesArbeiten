
class Overview {
    private _textfield: any;
    constructor() {
        document.addEventListener('DOMContentLoaded', ()=>{
            (<any>window.parent).shell.setTitle("Literatur-Organisation");
            this._textfield = (<any>window).mdc.textField.MDCTextField.attachTo( document.querySelector('.mdc-text-field'));
        })
    }
}

new Overview()