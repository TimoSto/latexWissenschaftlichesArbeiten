import {MDCTextField} from "@material/textfield/component";
import {MDCSelect} from "@material/select/component";
import SaveEntry from "./SaveEntry";

document.addEventListener('DOMContentLoaded', ()=>{
    new EntryPage();
})

class EntryPage {

    private _keyField: MDCTextField;
    private _typeSelect: MDCSelect;

    private _templateTF: HTMLElement;
    private _fieldsArea: HTMLElement;

    private _valueFields: MDCTextField[] = [];
    private _fieldNames: string[];

    private _prevValuesElement: HTMLElement;

    private _initialKey: string = "";

    private project: string;

    constructor() {

        this.project = new URLSearchParams(window.location.search).get('project');

        this._keyField = new MDCTextField( document.querySelector('#keyField'));

        this._typeSelect = new MDCSelect( document.querySelector('#typeSelect') );

        this._typeSelect.listen('MDCSelect:change', ()=>{

            fetch('/typeFields/' + this._typeSelect.value).then(response => response.json())
                .then(data => {this.SetupFieldsForType( data ); });
        });

        this._templateTF = document.querySelector('#template');
        this._templateTF.remove();

        this._fieldsArea = document.querySelector('#fieldsArea');

        document.querySelector('#saveEntry').addEventListener( 'click', ()=>{
            this.Save()
        });

        this._prevValuesElement = document.querySelector('#values');
        let key = this._prevValuesElement.getAttribute('data-key');
        if( key ) {
            this._keyField.value = key;
            this._initialKey = key;
            this._typeSelect.value = this._prevValuesElement.getAttribute('data-typ');

        }
    }

    SetupFieldsForType(obj: any) {
        this._fieldsArea.querySelectorAll('*').forEach(el => el.remove());
        this._valueFields = [];//TODO: Migrate values on typechange
        this._fieldNames = [];
        obj.Fields.forEach(field => {
            let element = this._templateTF.cloneNode(true);
            (<HTMLElement>element).querySelector('.mdc-floating-label').innerHTML = field.Field;
            let newTF = new MDCTextField(<HTMLElement>element);
            this._fieldsArea.append(element);
            this._valueFields.push(newTF);
            this._fieldNames.push(field.Field);
        });

        for( let i=0 ; i<this._valueFields.length ; i++ ) {
            if( this._prevValuesElement.children[i] ) {
                this._valueFields[i].value = this._prevValuesElement.children[i].innerHTML;
            }
        }
    }

    Save() {
        let valuePairs = [];
        for( let i=0; i< this._valueFields.length; i++ ) {
            valuePairs.push({
                Attr: this._fieldNames[i],
                Value: this._valueFields[i].value
            })
        }

        SaveEntry(this._initialKey, this.project, valuePairs, this._typeSelect.value, this._keyField.value).then(valid => {
            if( valid ) {
                console.log('valid');
                (<any>window).lapi.ReloadOverview();
                window.location.href= '/entry/' + this._keyField.value+'?project='+this.project;
            }
        });
    }
}