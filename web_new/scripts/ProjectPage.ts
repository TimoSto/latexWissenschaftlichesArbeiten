import {MDCTextField} from "@material/textfield/component";
import SaveProjectName from "./SaveProjectName";
import DeleteType from "./DeleteType";
import EditType from "./EditType";
import DeleteEntry from "./DeleteEntry";

class ProjectPage {

    private _nameField: MDCTextField;

    private _initialName: string;

    constructor() {
        this._nameField = new MDCTextField(document.querySelector('.mdc-text-field'));

        this._initialName = this._nameField.value;

        document.querySelector('.headline button').addEventListener('click', ()=>{
            SaveProjectName(this._nameField.value, this._initialName)
        });

        document.querySelectorAll('#entrylist [data-delete]').forEach(el =>{
            const value = el.getAttribute('data-delete');
            el.addEventListener( 'click', ()=>{
                DeleteEntry(value, this._initialName)
            });
        });

        document.querySelectorAll('#entrylist [data-edit]').forEach(el =>{
            const value = el.getAttribute('data-edit');
            el.addEventListener( 'click', ()=>{
                (<any>window).lapi.NavigateToEntry(value);
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    new ProjectPage();
})