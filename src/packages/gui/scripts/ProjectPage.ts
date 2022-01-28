import InitExpandableAreas from "./InitExpandableAreas";

class ProjectPage {

    constructor() {
        document.addEventListener('DOMContentLoaded', ()=>{
            this.init()
        })
    }

    private init() {
        InitExpandableAreas();
    }
}

new ProjectPage();