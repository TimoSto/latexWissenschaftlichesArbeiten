import InitExpandableAreas from "./InitExpandableAreas";

class ProjectPage {

    constructor() {
        document.addEventListener('DOMContentLoaded', ()=>{
            this.init()
        })
    }

    private init() {
        InitExpandableAreas();

        let pname = window.location.href.split('/projects/')[1]

        document.querySelector('#new-type').addEventListener('click', ()=>{
            (<any>window.parent).setEdit('/editType?project='+pname)
        });

        document.querySelector('#new-entry').addEventListener('click', ()=>{
            (<any>window.parent).setEdit('/editEntry?project='+pname)
        });
    }
}

new ProjectPage();