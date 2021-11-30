
document.addEventListener('DOMContentLoaded', () => {
    new OverviewPage();
});

class OverviewPage {

    constructor() {

        document.querySelectorAll('[data-edit-type]').forEach(el => {
            const typeToEdit = el.getAttribute('data-edit-type');
            el.addEventListener('click', ()=>{
                console.log('hey');
                (<any>window).lapi.NavigateToType(typeToEdit);
            })
        })

    }
}