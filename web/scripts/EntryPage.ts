import {MDCTextField} from "@material/textfield/component";
import {MDCSelect} from "@material/select/component";
import GetTypeFields from "./GetTypeFields";

document.addEventListener('DOMContentLoaded', ()=>{
    new EntryPage();
})

class EntryPage {

    private _keyField: MDCTextField;
    private _typeSelect: MDCSelect;

    private _templateTF: MDCTextField;

    constructor() {
        this._keyField = new MDCTextField( document.querySelector('#keyField'));

        this._typeSelect = new MDCSelect( document.querySelector('#typeSelect') );

        this._typeSelect.listen('MDCSelect:change', ()=>{
            let fields = GetTypeFields(this._typeSelect.value)
        });

        this._templateTF = new MDCTextField( document.querySelector('#template') );
        this._templateTF.root.remove();
    }
}