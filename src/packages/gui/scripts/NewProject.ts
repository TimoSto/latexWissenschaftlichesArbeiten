import {MDCTextField} from "@material/textfield/component";

class NewProject {

    constructor() {
        document.addEventListener('DOMContentLoaded', ()=>{
            let textField = new MDCTextField(document.querySelector('.mdc-text-field'));
            let btn = <HTMLButtonElement>document.querySelector('#create');

            document.querySelector('.mdc-text-field input').addEventListener('change', ()=>{
                btn.disabled = textField.value == '';
            });

            btn.addEventListener('click', ()=>{
                fetch('/createProject', {
                    method: 'POST',
                    body: JSON.stringify({ Name: textField.value })
                }).then(resp => {
                    if (resp.status === 200) {
                        window.parent.location.replace('/overview?project=' + textField.value)
                    } else if (resp.status === 400) {
                        textField.valid = false;
                    }
                })
            })
        })
    }
}

new NewProject();