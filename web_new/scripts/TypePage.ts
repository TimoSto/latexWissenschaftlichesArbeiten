import Field from "./Field";
import SaveType from "./SaveType";
import {MDCTextField} from "@material/textfield/component";
import {MDCSelect} from "@material/select/component";

class TypePage {
    private bib_attrTextFields = [];
    private bib_styleSelects = [];
    private bib_prefixTfs = [];
    private bib_suffixTfs = [];

    private cite_attrTextFields = [];
    private cite_styleSelects = [];
    private cite_prefixTfs = [];
    private cite_suffixTfs = [];

    private bibFields: Field[] = [];
    private citeFields: Field[] = [];

    private _nameField: MDCTextField;
    private _initialName: string;

    constructor() {
        document.addEventListener( 'DOMContentLoaded', ()=>{

            this._nameField = new MDCTextField(document.querySelector('.headline .mdc-text-field'));

            this._initialName = this._nameField.value;

            let elements = document.querySelectorAll('#bibtable .my-table--row .my-table-cell:nth-child(2) .mdc-text-field')

            elements.forEach((el, n) => {
                const index = n;
                const attrTextField = new MDCTextField( el );
                attrTextField.root.querySelector('input').addEventListener('change', ()=> {
                    if( index > this.bibFields.length - 1 ) {
                        this.bibFields.push(new Field("", "normal", "", ""))
                    }
                    console.log(attrTextField.value)
                    if(index === this.bibFields.length - 1 && attrTextField.value == "") {
                        this.bibFields.pop();
                        return
                    }
                    if( this.bibFields[index].Field != attrTextField.value) {
                        this.bibFields[index].Field = attrTextField.value;
                        this.syncExample();
                    }
                })
                this.bib_attrTextFields.push(attrTextField);
            });

            let styleElements = document.querySelectorAll('#bibtable .my-table--row .my-table-cell:nth-child(3) .mdc-select')

            styleElements.forEach((el, n) => {
                const index = n;
                const newSelect = new MDCSelect( el );
                newSelect.listen('MDCSelect:change', ()=> {
                    if( index > this.bibFields.length - 1 ) {
                        this.bibFields.push(new Field("", "normal", "", ""))
                    }
                    if( this.bibFields[index].Style != newSelect.value) {
                        this.bibFields[index].Style = newSelect.value;
                        this.syncExample();
                    }
                })
                this.bib_styleSelects.push(newSelect);
            });

            let tf_elements = document.querySelectorAll('#bibtable .my-table--row .my-table-cell:nth-child(4) .mdc-text-field')

            tf_elements.forEach((el, n) => {
                const index = n;
                this.bib_prefixTfs.push( new MDCTextField( el ));
                el.querySelector('input').addEventListener('change', ()=>{
                    if( index > this.bibFields.length - 1 ) {
                        this.bibFields.push(new Field("", "normal", "", ""))
                    }
                    this.bibFields[index].Prefix = this.bib_prefixTfs[index].value;
                    this.syncExample()
                })
            });

            let tf_elements2 = document.querySelectorAll('#bibtable .my-table--row .my-table-cell:nth-child(5) .mdc-text-field')

            tf_elements2.forEach((el, n) => {
                const index = n;
                this.bib_suffixTfs.push( new MDCTextField( el ));
                el.querySelector('input').addEventListener('change', ()=>{
                    if( index > this.bibFields.length - 1 ) {
                        this.bibFields.push(new Field("", "normal", "", ""))
                    }
                    this.bibFields[index].Suffix = this.bib_suffixTfs[index].value;
                    this.syncExample()
                })
            });

            let elementsc = document.querySelectorAll('#citetable .my-table--row .my-table-cell:nth-child(2) .mdc-text-field')

            elementsc.forEach((el, n) => {
                const index = n;
                const attrTextField = new MDCTextField( el );
                attrTextField.root.querySelector('input').addEventListener('change', ()=> {
                    if( index > this.citeFields.length - 1 ) {
                        this.citeFields.push(new Field("", "normal", "", ""))
                    }
                    console.log(attrTextField.value)
                    if(index === this.citeFields.length - 1 && attrTextField.value == "") {
                        this.citeFields.pop();
                        return
                    }
                    if( this.citeFields[index].Field != attrTextField.value) {
                        this.citeFields[index].Field = attrTextField.value;
                        this.syncExample();
                    }
                })
                this.cite_attrTextFields.push(attrTextField);
            });

            let styleElementsc = document.querySelectorAll('#citetable .my-table--row .my-table-cell:nth-child(3) .mdc-select')

            styleElementsc.forEach((el, n) => {
                const index = n;
                const newSelect = new MDCSelect( el );
                newSelect.listen('MDCSelect:change', ()=> {
                    if( index > this.citeFields.length - 1 ) {
                        this.citeFields.push(new Field("", "normal", "", ""))
                    }
                    if( this.citeFields[index].Style != newSelect.value) {
                        this.citeFields[index].Style = newSelect.value;
                        this.syncExample();
                    }
                })
                this.cite_styleSelects.push(newSelect);
            });

            let tf_elementsc = document.querySelectorAll('#citetable .my-table--row .my-table-cell:nth-child(4) .mdc-text-field')

            tf_elementsc.forEach((el, n) => {
                const index = n;
                this.cite_prefixTfs.push( new MDCTextField( el ));
                el.querySelector('input').addEventListener('change', ()=>{
                    if( index > this.citeFields.length - 1 ) {
                        this.citeFields.push(new Field("", "normal", "", ""))
                    }
                    this.citeFields[index].Prefix = this.cite_prefixTfs[index].value;
                    this.syncExample()
                })
            });

            let tf_elements2c = document.querySelectorAll('#citetable .my-table--row .my-table-cell:nth-child(5) .mdc-text-field')

            tf_elements2c.forEach((el, n) => {
                const index = n;
                this.cite_suffixTfs.push( new MDCTextField( el ));
                el.querySelector('input').addEventListener('change', ()=>{
                    if( index > this.citeFields.length - 1 ) {
                        this.citeFields.push(new Field("", "normal", "", ""))
                    }
                    this.citeFields[index].Suffix = this.cite_suffixTfs[index].value;
                    this.syncExample()
                })
            });

            let valuesElement = document.querySelector( '#values' );
            let bibvaluesElement = document.querySelectorAll( '#bibFields div' );
            let citevaluesElement = document.querySelectorAll( '#citeFields div' );

            let name = valuesElement.getAttribute('data-name');

            let bibFields = [];
            Array.prototype.slice.call(bibvaluesElement).forEach(el => {
                this.bibFields.push(new Field(el.getAttribute('data-field'), el.getAttribute('data-style'), el.getAttribute('data-prefix'), el.getAttribute('data-suffix'), ))
            });
            let citeFields = [];
            Array.prototype.slice.call(citevaluesElement).forEach(el => {
                this.citeFields.push(new Field(el.getAttribute('data-field'), el.getAttribute('data-style'), el.getAttribute('data-prefix'), el.getAttribute('data-suffix'), ))
            });

            this.syncExample();

            document.querySelector('.headline button').addEventListener('click', ()=>{
                SaveType(this._nameField.value, this._initialName, this.bibFields, this.citeFields). then(valid => {

                    (<any>window).lapi.ReloadOverview();

                    window.location.replace('/type/'+this._nameField.value);


                })
            });

        });


    }

    syncExample() {
        let bibExample = '';
        this.bibFields.forEach( (field, n) => {

            this.bib_attrTextFields[n].value = field.Field;
            this.bib_styleSelects[n].value = field.Style;
            this.bib_prefixTfs[n].value = field.Prefix;
            this.bib_suffixTfs[n].value = field.Suffix;
            bibExample += field.Prefix;
            switch (field.Style){
                case 'italic':
                    bibExample += '<i>';
                    break;
                case 'fett':
                    bibExample += '<b>'
                    break;
            }

            bibExample += field.Field;
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
        this.citeFields.forEach( (field, n) => {
            console.log(n, field.Field)
            this.cite_attrTextFields[n].value = field.Field;
            this.cite_styleSelects[n].value = field.Style;
            this.cite_prefixTfs[n].value = field.Prefix;
            this.cite_suffixTfs[n].value = field.Suffix;
            citeExample += field.Prefix;
            switch (field.Style){
                case 'italic':
                    citeExample += '<i>';
                    break;
                case 'bold':
                    citeExample += '<b>'
                    break;
            }
            citeExample += field.Field;
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

        document.getElementById('citeExample').innerHTML = citeExample + '.';
    }
}

new TypePage()