import Field from "./Field";
import SaveType from "./SaveType";

class TypePage {
    private bib_attrSelects = [];
    private bib_styleSelects = [];
    private bib_prefixTfs = [];
    private bib_suffixTfs = [];

    private cite_attrSelects = [];
    private cite_styleSelects = [];
    private cite_prefixTfs = [];
    private cite_suffixTfs = [];

    private bibFields: Field[] = [];
    private citeFields: Field[] = [];

    constructor() {
        document.addEventListener( 'DOMContentLoaded', ()=>{
            let elements = document.querySelectorAll('#bibtable .my-table--row .my-table-cell:nth-child(2) .mdc-select')

            elements.forEach((el, n) => {
                const index = n;
                const newSelect = (<any>window).mdc.select.MDCSelect.attachTo( el );
                newSelect.listen('MDCSelect:change', ()=> {
                    if( index > this.bibFields.length - 1 ) {
                        this.bibFields.push(new Field("", "normal", "", ""))
                    }
                    if( this.bibFields[index].Field != newSelect.value) {
                        this.bibFields[index].Field = newSelect.value;
                        this.syncExample();
                    }
                })
                this.bib_attrSelects.push(newSelect);
            });

            let styleElements = document.querySelectorAll('#bibtable .my-table--row .my-table-cell:nth-child(3) .mdc-select')

            styleElements.forEach((el, n) => {
                const index = n;
                const newSelect = (<any>window).mdc.select.MDCSelect.attachTo( el );
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
                this.bib_prefixTfs.push( (<any>window).mdc.textField.MDCTextField.attachTo( el ));
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
                this.bib_suffixTfs.push( (<any>window).mdc.textField.MDCTextField.attachTo( el ));
                el.querySelector('input').addEventListener('change', ()=>{
                    if( index > this.bibFields.length - 1 ) {
                        this.bibFields.push(new Field("", "normal", "", ""))
                    }
                    this.bibFields[index].Suffix = this.bib_suffixTfs[index].value;
                    this.syncExample()
                })
            });

            let elementsc = document.querySelectorAll('#citetable .my-table--row .my-table-cell:nth-child(2) .mdc-select')

            elementsc.forEach((el, n) => {
                const index = n;
                const newSelect = (<any>window).mdc.select.MDCSelect.attachTo( el );
                newSelect.listen('MDCSelect:change', ()=> {
                    if( index > this.citeFields.length - 1 ) {
                        this.citeFields.push(new Field("", "normal", "", ""))
                    }
                    if( this.citeFields[index].Field != newSelect.value) {
                        this.citeFields[index].Field = newSelect.value;
                        this.syncExample();
                    }
                })
                this.cite_attrSelects.push(newSelect);
            });

            let styleElementsc = document.querySelectorAll('#citetable .my-table--row .my-table-cell:nth-child(3) .mdc-select')

            styleElementsc.forEach((el, n) => {
                const index = n;
                const newSelect = (<any>window).mdc.select.MDCSelect.attachTo( el );
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
                this.cite_prefixTfs.push( (<any>window).mdc.textField.MDCTextField.attachTo( el ));
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
                this.cite_suffixTfs.push( (<any>window).mdc.textField.MDCTextField.attachTo( el ));
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

            document.querySelector('.mdc-button--raised').addEventListener('click', ()=>{
                SaveType((<any>window).location.href.split('/type/')[1], this.bibFields, this.citeFields)
            });

        });


    }

    syncExample() {
        let bibExample = '';
        this.bibFields.forEach( (field, n) => {

            this.bib_attrSelects[n].value = field.Field;
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
            switch (field.Field) {
                case 'autor':
                    bibExample += 'Mustermann, M.'
                    break;
                case 'titel':
                    bibExample += 'Beispieltitel'
                    break;
                case 'auflage':
                    bibExample += '1'
                    break;
                case 'ort':
                    bibExample += "Hamburg"
                    break;
                case 'datum':
                    bibExample += "23.01.2021"
                    break
                case 'url':
                    bibExample += 'https://example.com/page'
                    break
                case 'stand':
                    bibExample += '23.01.2020'
                    break;
                case 'zeitschrift':
                    bibExample += 'Playboy'
                    break;
                case 'seiten':
                    bibExample += 'S. 76-90';
                    break;
            }
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

            this.cite_attrSelects[n].value = field.Field;
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
            switch (field.Field) {
                case 'autor':
                    citeExample += 'Mustermann, M.'
                    break;
                case 'titel':
                    citeExample += 'Beispieltitel'
                    break;
                case 'auflage':
                    citeExample += '1'
                    break;
                case 'ort':
                    citeExample += "Hamburg"
                    break;
                case 'datum':
                    citeExample += "23.01.2021"
                    break
                case 'url':
                    citeExample += 'https://example.com/page'
                    break
                case 'stand':
                    citeExample += '23.01.2020'
                    break;
                case 'zeitschrift':
                    citeExample += 'Playboy'
                    break;
                case 'seiten':
                    citeExample += 'S. 76-90';
                    break;
            }
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