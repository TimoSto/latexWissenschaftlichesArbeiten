import DeleteType from "./DeleteType";
import SaveType from "./SaveType";
import DeleteEntry from "./DeleteEntry";
import SaveEntry from "./SaveEntry";

class Overview {
    private types = [];
    private entries = [];

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
            let saveButton = <HTMLButtonElement>document.querySelector('#createTypeBtn');
            saveButton.addEventListener('click', ()=>{
                SaveType(input.value, [], []);
            })
            input.root.querySelector('input').addEventListener('change', ()=>{
                saveButton.disabled = !(input.value.length > 0 && this.types.indexOf(input.value) == -1);
            })

            let lis = document.querySelectorAll('#expand-list li[data-eindex]');
            let expand_divs = document.querySelectorAll('#expand-list .area');
            console.log(lis)
            lis[0].addEventListener('click', ()=>{
                expand_divs[0].classList.toggle('area-closed');
            });
            lis[1].addEventListener('click', ()=>{
                expand_divs[1].classList.toggle('area-closed');
            })

            let editElements2 = document.querySelectorAll('[data-edit-entry]');

            editElements2.forEach(el => {
                let type = el.getAttribute('data-edit-entry');
                this.entries.push(type);
                el.addEventListener('click', (evt)=>{

                    (<any>window.parent).shell.NavigateToEntry(type);
                })
            });

            let deleteElements2 = document.querySelectorAll('[data-delete-entry]');

            deleteElements2.forEach(el => {
                let type = el.getAttribute('data-delete-entry');

                el.addEventListener('click', (evt)=>{

                    DeleteEntry(type);
                })
            });

            let saveBtn2 = document.querySelector('#createEntryBtn');
            saveBtn2.addEventListener('click', ()=>{
                //SaveEntry("", [], "");
                (<any>window.parent).shell.NavigateToEntry('')
            })
        })
    }
}

new Overview()