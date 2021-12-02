import {MDCTextField} from "@material/textfield/component";
import {MDCSelect} from "@material/select/component";
import GetTypeFields from "./GetTypeFields";

document.addEventListener('DOMContentLoaded', ()=>{
    new EntryPage();
})

class EntryPage {

    private _keyField: MDCTextField;
    private _typeSelect: MDCSelect;

    private _templateTF: HTMLElement;
    private _fieldsArea: HTMLElement;

    private _valueFields: MDCTextField[] = [];

    constructor() {
        this._keyField = new MDCTextField( document.querySelector('#keyField'));

        this._typeSelect = new MDCSelect( document.querySelector('#typeSelect') );

        this._typeSelect.listen('MDCSelect:change', ()=>{
            let fields;
            fetch('/typeFields/' + this._typeSelect.value).then(response => response.json())
                .then(data => {this.SetupFieldsForType( data ); });
        });

        this._templateTF = document.querySelector('#template');
        this._templateTF.remove();

        this._fieldsArea = document.querySelector('#fieldsArea');
    }

    SetupFieldsForType(obj: any) {
        this._fieldsArea.querySelectorAll('*').forEach(el => el.remove());
        this._valueFields = [];//TODO: Migrate values on typechange
        obj.Fields.forEach(field => {
            let element = this._templateTF.cloneNode(true);
            (<HTMLElement>element).querySelector('.mdc-floating-label').innerHTML = field.Field;
            let newTF = new MDCTextField(<HTMLElement>element);
            this._fieldsArea.append(element);
            this._valueFields.push(newTF);
        });
    }
}