import {MDCDialog} from "@material/dialog/component";
import {MDCTextField} from "@material/textfield/component";
import SaveType from "./SaveType";

document.addEventListener('DOMContentLoaded', () => {
    new OverviewPage();
});

class OverviewPage {

    private _dialog: MDCDialog;
    private _newTypeTF: MDCTextField;
    private _newTypeBtn: HTMLButtonElement;

    constructor() {

        document.querySelectorAll('[data-edit-type]').forEach(el => {
            const typeToEdit = el.getAttribute('data-edit-type');
            el.addEventListener('click', ()=>{
                console.log('hey');
                (<any>window).lapi.NavigateToType(typeToEdit);
            });
            this._dialog = new MDCDialog(document.querySelector('.mdc-dialog'));

            document.getElementById('createTypeBtn').addEventListener( 'click', ()=>{
                this._dialog.open();
            });

            this._newTypeTF = new MDCTextField(this._dialog.root.querySelector('.mdc-text-field'));
            this._newTypeBtn = this._dialog.root.querySelector('button:disabled');
            this._newTypeTF.root.querySelector('input').addEventListener('change', ()=>{
                this._newTypeBtn.disabled = this._newTypeTF.value === '';
            });
            this._newTypeBtn.addEventListener('click', ()=>{
                SaveType(this._newTypeTF.value, [], []);
                (<any>window).lapi.NavigateToType(this._newTypeTF.value);
            });

            document.querySelector('#createEntryBtn').addEventListener( 'click', ()=>{
                (<any>window).lapi.NavigateToEntry('new');
            });
        })

    }
}