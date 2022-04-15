import {MDCDialog} from "@material/dialog/component";
import {MDCSelect} from "@material/select/component";
import SaveStyles from "./SaveStyle";
import {MDCTextField} from "@material/textfield/component";


document.addEventListener('DOMContentLoaded', ()=>{
    new EditStyles();
});

export class Package {
    Name: string
    Options: string;
    Included: string;
    ActiveOption: string;
}

class EditStyles {

    private _project: string;
    private _packages: Package[] = [];

    private _optionDialog: MDCDialog;

    private _activeIndex: number;

    private _optionTF: MDCTextField;

    constructor() {
        this._project = new URLSearchParams(window.location.search).get('project')

        this._optionDialog = new MDCDialog(document.querySelector('.mdc-dialog'));

        this._optionTF = new MDCTextField(document.querySelector('.mdc-text-field'));

        // this._includeButtons = Array.from(document.querySelectorAll('.include-icon'));
        // this._disableButtons = Array.from(document.querySelectorAll('.remove-icon'));
        // this._editButtons = Array.from(document.querySelectorAll('.remove-icon'));

        let lis = document.querySelectorAll('.style-li');

        lis.forEach((el, i) => {
            let newPackage = new Package();
            const pname = el.getAttribute('data-package-name');
            newPackage.Name = pname;
            newPackage.Included = el.getAttribute('data-included');
            newPackage.ActiveOption = el.getAttribute('data-active-option');
            // if( newPackage.ActiveOption.length == 0 ) {
            //     newPackage.ActiveOption = '/';
            // }

            this._packages.push(newPackage);

            const index = i;

            const editBtn = el.querySelector('.edit-icon');
            if( editBtn ) {
                editBtn.addEventListener('click', ()=>{
                    this._activeIndex = index;
                    this.openOptionDialog(pname, this._packages[index].ActiveOption);
                });
            }

            const enableBtn = el.querySelector('.turn-on');
            if( enableBtn ) {
                enableBtn.addEventListener('click', ()=>{
                    this._packages[index].Included = 'true';
                    lis[index].setAttribute('data-included', 'true');
                });
            }

            const disableBtn = el.querySelector('.turn-off');
            if( disableBtn ) {
                disableBtn.addEventListener('click', ()=>{
                    this._packages[index].Included = 'false';
                    lis[index].setAttribute('data-included', 'false');
                });
            }
        });

        document.querySelector('.mdc-button#save').addEventListener('click', ()=>{
            SaveStyles(this._project, this._packages).then(valid => {
                if( valid ) {
                    window.location.reload();
                }
            })
        })

        document.querySelector('.mdc-button#refreshOption').addEventListener('click', ()=>{
            let option = this._optionTF.value;
            document.querySelectorAll('.style-li')[this._activeIndex].querySelector('.mdc-deprecated-list-item__secondary-text').innerHTML = option == '' ? '/' : option;

            this._packages[this._activeIndex].ActiveOption = option;

            this._optionDialog.close();
        });
    }

    private openOptionDialog(pckg: string, selected: string) {
        document.querySelector('#packagename').innerHTML = pckg;
    console.log(selected)
        this._optionTF.value = selected;

        this._optionDialog.open();
    }
}