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
                if(resp.status === 200) {
                    (<any>window.parent).openAlertDialog('Backup erfolgreich erstellt. Du kannst es einfach wieder auf dem backup-Ordner in den projects-Ordner kopieren, um das Projekt auf den jetzigen Stand zurückzusetzen.')
                } else {
                    (<any>window.parent).openErrorDialog('Beim Erstellen des Backups ist was schief gelaufen.')
                }
            })
        });

        document.querySelector('#use-as-default').addEventListener('click', ()=>{
            //erstelle CustomDefaultStyles und nutze von nun an diese für neue Projekte
            (<any>window.parent).openConfirmDialog("Die Styles und Literaturtypen dieses Projektes für alle neuen Projekte verwenden? Das beinhaltet auch sämtliche Änderungen an den .sty-Dateien.", ()=>{
                fetch('/setDefault?project='+pname).then(resp => {
                    if(resp.status === 200) {
                        (<any>window.parent).openAlertDialog('Jedes neue Projekt hat ab jetzt die aktuell hier verfügbaren Literaturtypen.')
                    } else {
                        (<any>window.parent).openErrorDialog('Es ist was schief gelaufen.')
                    }
                })
            })

        });

        document.querySelector('#refresh').addEventListener('click', ()=>{

            (<any>window.parent).openConfirmDialog("Die Literaturtypen dieses Projektes auf den aktuellen Stand bringen? Neu von dir erstellte Typen werden erhalten bleiben, aber Änderungen an den Standard-Typen werden überschrieben werden.", ()=>{
                fetch('/refreshTypes?project='+pname).then(resp => {
                    if(resp.status === 200) {
                        (<any>window.parent).openAlertDialog('Die Literaturtypen und Styles sind jetzt auf dem neuesten Stand.');
                        setTimeout(()=>{
                            (<any>window.parent).setMain('/projects/'+pname);
                        }, 500)
                    } else {
                        (<any>window.parent).openErrorDialog('Es ist was schief gelaufen.')
                    }
                })
            })
        });
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