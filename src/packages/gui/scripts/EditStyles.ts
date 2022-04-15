import {MDCDialog} from "@material/dialog/component";
import {MDCSelect} from "@material/select/component";
import SaveStyles from "./SaveStyle";


document.addEventListener('DOMContentLoaded', ()=>{
    new EditStyles();
});

export class Package {
    Name: string
    Options: string;
    Included: string;
    AvailableOptions: string[];
    ActiveOption: string;
}

class EditStyles {

    private _project: string;
    private _packages: Package[] = [];

    private _optionDialog: MDCDialog;
    private _optionSelect: MDCSelect;
    private _optionsList: HTMLElement;
    private _optionTmpl: HTMLElement;

    private _activeIndex: number;

    constructor() {
        this._project = new URLSearchParams(window.location.search).get('project')

        this._optionDialog = new MDCDialog(document.querySelector('.mdc-dialog'));

        this._optionSelect = new MDCSelect(document.querySelector('.mdc-select'));
        this._optionSelect.listen('MDCSelect:change', ()=>{
            this._packages[this._activeIndex].ActiveOption = this._optionSelect.value;
            document.querySelectorAll('.mdc-deprecated-list-item__secondary-text')[this._activeIndex].innerHTML = this._optionSelect.value;
        });
        this._optionTmpl = document.querySelector('.mdc-select li');
        this._optionTmpl.remove();
        this._optionsList = document.querySelector('.mdc-select ul');

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
            if( newPackage.ActiveOption.length == 0 ) {
                newPackage.ActiveOption = undefined;
            }
            let avopt = el.getAttribute('data-available-options');
            const avoptions = avopt.substr(1, avopt.length-2).split(' ');
            if( avoptions.length > 0 && avoptions[0].length > 0 ) {
                newPackage.AvailableOptions = avoptions;
            }
            this._packages.push(newPackage);

            const index = i;
            const element = el;
            const activeOption = newPackage.ActiveOption;

            el.querySelector('.include-icon').addEventListener('click', ()=>{
                this._packages[index].Included = 'true';
                element.setAttribute('data-included', 'true');
            });
            el.querySelector('.remove-icon').addEventListener('click', ()=>{
                this._packages[index].Included = 'false';
                element.setAttribute('data-included', 'false');
            });

            const editBtn = el.querySelector('.edit-icon');
            if( editBtn ) {
                editBtn.addEventListener('click', ()=>{
                    this._activeIndex = index;
                    this.openOptionDialog(pname, avoptions, this._packages[index].ActiveOption);
                });
            }
        });

        document.querySelector('.mdc-button').addEventListener('click', ()=>{
            SaveStyles(this._project, this._packages).then(valid => {
                if( valid ) {
                    window.location.reload();
                }
            })
        })
    }

    private openOptionDialog(pckg: string, options: string[], selected: string) {
        document.querySelector('#packagename').innerHTML = pckg;
        this._optionsList.innerHTML = '';
        options.forEach(option => {
            let li = <HTMLElement>this._optionTmpl.cloneNode(true);
            li.querySelector('.mdc-deprecated-list-item__text').innerHTML = option;
            li.setAttribute('data-value', option);
            this._optionsList.appendChild(li);
        });
        this._optionSelect.layoutOptions();
        this._optionSelect.layout();
        this._optionSelect.setValue(selected);
        this._optionDialog.open();
    }
}