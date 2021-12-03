import {MDCDialog} from "@material/dialog/component";
import {MDCTextField} from "@material/textfield/component";
import SaveType from "./SaveType";
import DeleteType from "./DeleteType";
import DeleteEntry from "./DeleteEntry";

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

        });

        document.querySelectorAll('[data-delete-type]').forEach( el => {
            const typeToDelete = el.getAttribute('data-delete-type');
            el.addEventListener('click', ()=>{
                DeleteType(typeToDelete);
            });
        })

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

        document.querySelectorAll('[data-edit-entry]').forEach(el => {
            const entryToEdit = el.getAttribute('data-edit-entry');
            el.addEventListener('click', ()=>{
                console.log('hey');
                (<any>window).lapi.NavigateToEntry(entryToEdit);
            });

        });

        document.querySelectorAll('[data-delete-entry]').forEach( el => {
            const typeToEntry = el.getAttribute('data-delete-entry');
            el.addEventListener('click', ()=>{
                DeleteEntry(typeToEntry);
            });
        })
    }
}