import InitExpandableAreas from "./InitExpandableAreas";
import AnalyseAndSaveDroppdFile from "./AnalyseAndSaveDroppedFile";

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
            el.addEventListener('click', (e)=>{
                if ((<HTMLElement>e.target).getAttribute('data-delete-type')) return

                (<any>window.parent).setEdit('/editType?project='+pname+'&type='+typeKey)
            });
        });

        document.querySelectorAll('[data-delete-type]').forEach(el => {
            const typeKey = el.getAttribute('data-delete-type');
            el.addEventListener('click', ()=>{
                (<any>window.parent).openConfirmDialog('Willst du den Literaturtypen ' + typeKey + ' wirklich löschen?', ()=>{
                    this.DeleteType(pname, typeKey);
                });
            });
        });

        document.querySelector('#new-entry').addEventListener('click', ()=>{
            (<any>window.parent).setEdit('/editEntry?project='+pname)
        });

        document.querySelectorAll('[data-edit-entry]').forEach(el => {
            const entryKey = el.getAttribute('data-edit-entry');
            el.addEventListener('click', (e)=>{
                if ((<HTMLElement>e.target).getAttribute('data-delete-entry')) return

                (<any>window.parent).setEdit('/editEntry?project='+pname+'&entry='+entryKey)
            });
        })

        document.querySelectorAll('[data-delete-entry]').forEach(el => {
            const entryKey = el.getAttribute('data-delete-entry');
            el.addEventListener('click', ()=>{
                (<any>window.parent).openConfirmDialog('Willst du den Eintrag ' + entryKey + ' wirklich löschen?', ()=>{
                    this.DeleteEntry(pname, entryKey);
                });
            });
        });

        this.setupDragAndDrop(pname);

        document.querySelector('#cleanupCites').addEventListener('click', ()=>{
            fetch('/citeCleanup?project='+pname)
        })

        document.querySelector('#editStyles').addEventListener('click', ()=>{
            (<any>window.parent).setEdit('/editStyles?project=' + pname)
        });

        document.querySelector('#backup').addEventListener('click', ()=>{
            fetch('/backup?project='+pname).then(resp => {
                console.log(resp.status)
            })
        })
    }

    private DeleteEntry(project: string, entry: string) {
        fetch('/deleteEntry?project='+project+'&entry='+entry).then(resp =>{
            if( resp.status === 200 ) {
                window.location.reload();
            }
        })
    }

    private DeleteType(project: string, type: string) {
        fetch('/deleteType?project='+project+'&type='+type).then(resp =>{
            if( resp.status === 200 ) {
                window.location.reload();
            }
        })
    }

    private setupDragAndDrop(project: string) {

        let area = document.querySelector('#drop_zone');
        area.addEventListener('dragover', (e)=>{
            e.preventDefault();
        })
        area.addEventListener('drop', (e: DragEvent)=>{
            e.preventDefault()
            const dT = new DataTransfer();
            dT.items.add(e.dataTransfer.files[0]);
            let reader = new FileReader();
            reader.readAsText(dT.files[0], "UTF-8");
            reader.onload = function (evt) {

                let extension = dT.files[0].name.substr(dT.files[0].name.lastIndexOf('.'))

                console.log(extension)

                if( extension !== '.bib' ) {
                    (<any>window.parent).openErrorDialog('Du kannst nur .bib-Dateien hochladen.')
                    return
                }

                AnalyseAndSaveDroppdFile(<string>reader.result, project);

                // fetch('/importCitavi', {
                //     method: 'POST',
                //     body: JSON.stringify({File: <string>reader.result, Project: project})
                // }).then(resp => {
                //     if (resp.status === 200) {
                //         window.location.reload();
                //     }
                // })
                //Dialog mit Textfeld öffnen => gewünscht Zitierweise eingeben
            }
        })
    }
}

new ProjectPage();