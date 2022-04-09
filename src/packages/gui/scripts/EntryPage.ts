import {MDCTextField} from "@material/textfield/component";
import {MDCSelect} from "@material/select/component";
import SaveEntry from "./SaveEntry";
import {ParseStringToTeX, ParseTexToString} from "./TeXParser";

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

    private _typeObj: any;

    constructor() {

        this.project = new URLSearchParams(window.location.search).get('project');

        this._keyField = new MDCTextField( document.querySelector('#keyField'));

        this._typeSelect = new MDCSelect( document.querySelector('#typeSelect') );

        this._typeSelect.listen('MDCSelect:change', ()=>{

            fetch('/typeFields/' + this._typeSelect.value + '?project=' + this.project).then(response => response.json())
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
        this._typeObj = obj;
        console.log(obj)
        this._fieldsArea.querySelectorAll('*').forEach(el => el.remove());
        this._valueFields = [];//TODO: Migrate values on typechange
        this._fieldNames = [];
        obj.Fields.forEach((field: { Field: string; }) => {
            let element = this._templateTF.cloneNode(true);
            (<HTMLElement>element).querySelector('.mdc-floating-label').innerHTML = field.Field;
            let newTF = new MDCTextField(<HTMLElement>element);
            this._fieldsArea.append(element);
            (<HTMLElement>element).querySelector('input').addEventListener('change', ()=>{
                this.syncExample();
            });
            this._valueFields.push(newTF);
            this._fieldNames.push(field.Field);
        });
        obj.CiteFields.forEach((field: { Field: string; }) => {
            let found = false;
            obj.Fields.forEach((mf: { Field: string; }) => {
                if( mf.Field === field.Field ) {
                    found = true
                }
            });
            if(!found) {
                let element = this._templateTF.cloneNode(true);
                (<HTMLElement>element).querySelector('.mdc-floating-label').innerHTML = field.Field;
                let newTF = new MDCTextField(<HTMLElement>element);
                this._fieldsArea.append(element);
                (<HTMLElement>element).querySelector('input').addEventListener('change', ()=>{
                    this.syncExample();
                });
                this._valueFields.push(newTF);
                this._fieldNames.push(field.Field);
            }
        })

        for( let i=0 ; i<this._valueFields.length ; i++ ) {
            if( this._prevValuesElement.children[i] ) {
                this._valueFields[i].value = ParseTexToString(this._prevValuesElement.children[i].innerHTML);
            }
        }

        this.syncExample();
    }

    Save() {
        let valuePairs = [];
        for( let i=0; i< this._valueFields.length; i++ ) {
            valuePairs.push({
                Attr: this._fieldNames[i],
                Value: ParseStringToTeX(this._valueFields[i].value)
            })
        }

        console.log(valuePairs)

        SaveEntry(this._initialKey, this.project, valuePairs, this._typeSelect.value, this._keyField.value).then(valid => {
            if( valid ) {

                (<any>window.parent).reloadMain();
                window.location.href= '/editEntry?entry=' + this._keyField.value+'&project='+this.project;
            }
        });
    }

    syncExample() {
        let bibExample = '';
        this._typeObj.Fields.forEach( (field: { Prefix: string; Style: any; Field: string; Suffix: string; }, n: any) => {



            bibExample += field.Prefix;
            switch (field.Style){
                case 'italic':
                    bibExample += '<i>';
                    break;
                case 'fett':
                    bibExample += '<b>'
                    break;
            }
            let valueWithoutLinebreaks = this._valueFields[n].value.replaceAll('{{\\\\}}', ' ')

            bibExample += valueWithoutLinebreaks;
            switch (field.Style){
                case 'italic':
                    bibExample += '</i>';
                    break;
                case 'fett':
                    bibExample += '</b>'
                    break;
            }
            bibExample += field.Suffix;
        } );

        document.getElementById('bibExample').innerHTML = bibExample;

        let citeExample = '';
        this._typeObj.CiteFields.forEach( (field: { Prefix: string; Style: any; Field: string; Suffix: string; }, n: any) => {

            citeExample += field.Prefix;
            switch (field.Style){
                case 'italic':
                    citeExample += '<i>';
                    break;
                case 'bold':
                    citeExample += '<b>'
                    break;
            }
            this._fieldNames.forEach((name, i) => {
                if( name == field.Field ) {
                    citeExample += this._valueFields[i].value;
                }
            });
            switch (field.Style){
                case 'italic':
                    citeExample += '</i>';
                    break;
                case 'bold':
                    citeExample += '</b>'
                    break;
            }
            citeExample += field.Suffix;
        } );

        if (citeExample.charAt(citeExample.length-1) == " ") {
            citeExample += "S. xxx";
        }

        document.getElementById('citeExample').innerHTML = citeExample + '.';
    }
}