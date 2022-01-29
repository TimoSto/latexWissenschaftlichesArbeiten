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

        document.querySelectorAll('[data-edit-type]').forEach(el => {
            const typeKey = el.getAttribute('data-edit-type');
            el.addEventListener('click', ()=>{
                (<any>window.parent).setEdit('/editType?project='+pname+'&type='+typeKey)
            });
        });

        document.querySelectorAll('[data-delete-type]').forEach(el => {
            const typeKey = el.getAttribute('data-delete-type');
            el.addEventListener('click', ()=>{
                fetch('/deleteType?project='+pname+'&type='+typeKey).then(resp =>{
                    if( resp.status === 200 ) {
                        window.location.reload();
                    }
                })
            });
        });

        document.querySelector('#new-entry').addEventListener('click', ()=>{
            (<any>window.parent).setEdit('/editEntry?project='+pname)
        });

        document.querySelectorAll('[data-edit-entry]').forEach(el => {
            const entryKey = el.getAttribute('data-edit-entry');
            el.addEventListener('click', ()=>{
                (<any>window.parent).setEdit('/editEntry?project='+pname+'&entry='+entryKey)
            });
        })

        document.querySelectorAll('[data-delete-entry]').forEach(el => {
            const entryKey = el.getAttribute('data-delete-entry');
            el.addEventListener('click', ()=>{
                fetch('/deleteEntry?project='+pname+'&entry='+entryKey).then(resp =>{
                    if( resp.status === 200 ) {
                        window.location.reload();
                    }
                })
            });
        })
    }
}

new ProjectPage();