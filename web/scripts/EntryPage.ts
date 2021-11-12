
class EntryPage {
    private _typeSelect;
    private valuePairs = [];
    constructor() {
        document.addEventListener('DOMContentLoaded', ()=> {
            this._typeSelect =  (<any>window).mdc.select.MDCSelect.attachTo( document.querySelector('.mdc-select') );

            let tf_elements = document.querySelectorAll('.mdc-text-field');
            tf_elements.forEach((el, i) => {
                let tf = (<any>window).mdc.textField.MDCTextField.attachTo( el );
                const attr = el.querySelector('.mdc-floating-label').innerHTML;
                this.valuePairs.push(new ValuePair(attr, ''));
                const input = el.querySelector('input');
                const index = i;
                input.addEventListener('change', ()=>{
                    this.valuePairs[index].Value = input.value;
                })
            })
        })
    }
}

class ValuePair {
    Attr: string
    Value: string;
    constructor(a: string, v: string) {
        this.Attr = a;
        this.Value = v;
    }
}

new EntryPage()