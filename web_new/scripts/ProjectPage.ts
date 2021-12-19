import {MDCTextField} from "@material/textfield/component";
import SaveProjectName from "./SaveProjectName";

class ProjectPage {

    private _nameField: MDCTextField;

    private _initialName: string;

    constructor() {
        this._nameField = new MDCTextField(document.querySelector('.mdc-text-field'));

        this._initialName = this._nameField.value;

        document.querySelector('.headline button').addEventListener('click', ()=>{
            SaveProjectName(this._nameField.value, this._initialName)
        })
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    new ProjectPage();
})