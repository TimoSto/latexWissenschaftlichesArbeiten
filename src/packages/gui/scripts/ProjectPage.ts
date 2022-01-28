import InitExpandableAreas from "./InitExpandableAreas";

class ProjectPage {

    constructor() {
        document.addEventListener('DOMContentLoaded', ()=>{
            this.init()
        })
    }

    private init() {
        InitExpandableAreas();

        document.querySelector('#new-type').addEventListener('click', ()=>{
            (<any>window.parent).setEdit('/editType')
        });

        document.querySelector('#new-entry').addEventListener('click', ()=>{
            (<any>window.parent).setEdit('/editEntry')
        });
    }
}

new ProjectPage();