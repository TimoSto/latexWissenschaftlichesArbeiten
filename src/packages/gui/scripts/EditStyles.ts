

document.addEventListener('DOMContentLoaded', ()=>{
    new EditStyles();
});

class Package {
    Name: string
    Options: string;
    Included: string;
    AvailableOptions: string[];
    ActiveOption: string;
}

class EditStyles {

    private _project: string;
    private _packages: Package[] = [];

    constructor() {
        this._project = new URLSearchParams(window.location.search).get('project')

        // this._includeButtons = Array.from(document.querySelectorAll('.include-icon'));
        // this._disableButtons = Array.from(document.querySelectorAll('.remove-icon'));
        // this._editButtons = Array.from(document.querySelectorAll('.remove-icon'));

        let lis = document.querySelectorAll('.style-li');

        lis.forEach((el, i) => {
            let newPackage = new Package();
            newPackage.Name = el.getAttribute('data-package-name');
            newPackage.Included = el.getAttribute('data-included');
            newPackage.ActiveOption = el.getAttribute('data-active-option');
            if( newPackage.ActiveOption.length == 0 ) {
                newPackage.ActiveOption = undefined;
            }
            let avopt = el.getAttribute('data-available-options');
            let avoptions = avopt.substr(1, avopt.length-2).split(' ');
            if( avoptions.length > 0 && avoptions[0].length > 0 ) {
                newPackage.AvailableOptions = avoptions;
            }
            this._packages.push(newPackage);

            const index = i;
            const element = el;

            el.querySelector('.include-icon').addEventListener('click', ()=>{
                this._packages[index].Included = 'true';
                element.setAttribute('data-included', 'true');
            });
            el.querySelector('.remove-icon').addEventListener('click', ()=>{
                this._packages[index].Included = 'false';
                element.setAttribute('data-included', 'false');
            });
        });



        console.log(this._packages);
    }
}