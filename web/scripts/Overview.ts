import DeleteType from "./DeleteType";
import SaveType from "./SaveType";

class Overview {
    private types = [];

    constructor() {
        document.addEventListener('DOMContentLoaded', ()=>{
            (<any>window.parent).shell.setTitle("Literatur-Organisation");

            let editElements = document.querySelectorAll('[data-edit-type]');

            editElements.forEach(el => {
                let type = el.getAttribute('data-edit-type');
                this.types.push(type);
                el.addEventListener('click', (evt)=>{

                    (<any>window.parent).shell.NavigateToType(type);
                })
            });

            let deleteElements = document.querySelectorAll('[data-delete-type]');

            deleteElements.forEach(el => {
                let type = el.getAttribute('data-delete-type');
                this.types.push(type);
                el.addEventListener('click', (evt)=>{

                    DeleteType(type);
                })
            });

            let input = (<any>window).mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field'));
            let saveButton = <HTMLButtonElement>document.querySelector('.mdc-button--raised');
            saveButton.addEventListener('click', ()=>{
                SaveType(input.value, [], []);
            })
            input.root.querySelector('input').addEventListener('change', ()=>{
                saveButton.disabled = !(input.value.length > 0 && this.types.indexOf(input.value) == -1);
            })
        })
    }
}

new Overview()