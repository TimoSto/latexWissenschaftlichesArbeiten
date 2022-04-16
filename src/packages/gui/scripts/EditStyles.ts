import {MDCDialog} from "@material/dialog/component";
import SaveStyles from "./SaveStyle";
import {MDCTextField} from "@material/textfield/component";
import {CloseReason, MDCBanner} from "@material/banner";


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

    private _initialPackages: string;

    constructor() {
        this._project = new URLSearchParams(window.location.search).get('project')

        this._optionDialog = new MDCDialog(document.querySelector('.mdc-dialog'));

        this._optionTF = new MDCTextField(document.querySelector('.mdc-text-field'));

        (<any>window.parent).setEditSave(()=>{
            this.Save();
        });

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
                    this.syncSaveNecessary();
                });
            }

            const disableBtn = el.querySelector('.turn-off');
            if( disableBtn ) {
                disableBtn.addEventListener('click', ()=>{
                    this._packages[index].Included = 'false';
                    lis[index].setAttribute('data-included', 'false');
                    this.syncSaveNecessary();
                });
            }
        });

        this._initialPackages = JSON.stringify(this._packages);

        document.querySelector('.mdc-button#refreshOption').addEventListener('click', ()=>{
            let option = this._optionTF.value;
            document.querySelectorAll('.style-li')[this._activeIndex].querySelector('.mdc-deprecated-list-item__secondary-text').innerHTML = option == '' ? '/' : option;

            this._packages[this._activeIndex].ActiveOption = option;

            this._optionDialog.close();

            this.syncSaveNecessary();
        });

        setTimeout(()=>{
            if( !document.cookie.match(/^(.*;)?\s*DontShowWALaTeXBanner\s*=\s*[^;]+(.*)?$/) ){
                console.log('oban')
                let banner = new MDCBanner(document.querySelector('.mdc-banner'));
                banner.open();
                document.querySelector('.mdc-banner .mdc-button').addEventListener('click', ()=>{
                    banner.close(CloseReason.PRIMARY);
                    document.body.classList.remove('hide-beta-label');
                    let date = new Date();
                    date.setTime(date.getTime() + (365*24*60*60*1000));
                    let expires = "; expires=" + date.toUTCString();
                    document.cookie = "DontShowWALaTeXBanner" + "=" + ("true" || "")  + expires + "; path=/";
                })
            } else {
                document.body.classList.remove('hide-beta-label');
            }
        }, 200);

        this.syncSaveNecessary();
    }

    private openOptionDialog(pckg: string, selected: string) {
        document.querySelector('#packagename').innerHTML = pckg;
    console.log(selected)
        this._optionTF.value = selected;

        this._optionDialog.open();
    }

    private Save() {
        SaveStyles(this._project, this._packages).then(valid => {
            if( valid ) {
                window.location.reload();
            } else {
                (<any>window.parent).openErrorDialog('Beim Versuch, die Styles zu speichern, ist ein Fehler aufgetreten.')
            }
        })
    }

    private syncSaveNecessary() {
        let saveNecessary = (JSON.stringify(this._packages) != this._initialPackages);

        (<any>window.parent).editSavePossible(saveNecessary);
    }
}