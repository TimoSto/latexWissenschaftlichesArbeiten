
class ProjectPage {

    constructor() {
        document.addEventListener('DOMContentLoaded', ()=>{
            this.init()
        })
    }

    private init() {
        let expandableAreas = document.querySelectorAll('.expandable-area');
        let triggerIcons = document.querySelectorAll('.trigger-icon');

        triggerIcons.forEach((el, i) => {
            const ind = i;
            el.addEventListener('click', ()=>{
                expandableAreas[ind].classList.toggle('expandable-area--closed');
                el.classList.toggle('trigger-icon--rotated');
            })
        })
    }
}

new ProjectPage();