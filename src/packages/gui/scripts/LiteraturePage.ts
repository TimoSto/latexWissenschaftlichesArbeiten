import InitExpandableAreas from "./InitExpandableAreas";
import AnalyseAndSaveDroppdFile from "./AnalyseAndSaveDroppedFile";

class LiteraturePage {

    constructor() {
        document.addEventListener('DOMContentLoaded', ()=>{
            this.init()
        })
    }
    
    private rootWindow: any;

    private init() {
        this.rootWindow = window.parent.parent as any;
        
        InitExpandableAreas();

        const urlParams = new URLSearchParams(window.location.search);
        const pname = urlParams.get('project');

        document.querySelector('#new-type').addEventListener('click', ()=>{
            this.rootWindow.setEdit('/editType?project='+pname)
        });

        document.querySelectorAll('[data-edit-type]').forEach(el => {
            const typeKey = el.getAttribute('data-edit-type');
            el.addEventListener('click', (e)=>{
                if ((<HTMLElement>e.target).getAttribute('data-delete-type')) return

                this.rootWindow.setEdit('/editType?project='+pname+'&type='+typeKey)
            });
        });

        document.querySelectorAll('[data-delete-type]').forEach(el => {
            const typeKey = el.getAttribute('data-delete-type');
            el.addEventListener('click', ()=>{
                this.rootWindow.openConfirmDialog('Willst du den Literaturtypen ' + typeKey + ' wirklich löschen?', ()=>{
                    this.DeleteType(pname, typeKey);
                });
            });
        });

        document.querySelector('#new-entry').addEventListener('click', ()=>{
            this.rootWindow.setEdit('/editEntry?project='+encodeURIComponent(pname))
        });

        document.querySelectorAll('[data-edit-entry]').forEach(el => {
            const entryKey = el.getAttribute('data-edit-entry');
            el.addEventListener('click', (e)=>{
                if ((<HTMLElement>e.target).getAttribute('data-delete-entry')) return

                this.rootWindow.setEdit('/editEntry?project='+encodeURIComponent(pname)+'&entry='+encodeURIComponent(entryKey))
            });
        })

        document.querySelectorAll('[data-delete-entry]').forEach(el => {
            const entryKey = el.getAttribute('data-delete-entry');
            el.addEventListener('click', ()=>{
                this.rootWindow.openConfirmDialog('Willst du den Eintrag ' + entryKey + ' wirklich löschen?', ()=>{
                    this.DeleteEntry(pname, entryKey);
                });
            });
        });

        this.setupDragAndDrop(pname);

        document.querySelector('#cleanupCites').addEventListener('click', ()=>{
            fetch('/citeCleanup?project='+pname)
        })

        document.querySelector('#use-as-default').addEventListener('click', ()=>{
            //erstelle CustomDefaultStyles und nutze von nun an diese für neue Projekte
            this.rootWindow.openConfirmDialog("Die Styles und Literaturtypen dieses Projektes für alle neuen Projekte verwenden? Das beinhaltet auch sämtliche Änderungen an den .sty-Dateien.", ()=>{
                fetch('/setDefault?project='+pname).then(resp => {
                    if(resp.status === 200) {
                        this.rootWindow.openAlertDialog('Jedes neue Projekt hat ab jetzt die aktuell hier verfügbaren Literaturtypen.')
                    } else {
                        this.rootWindow.openErrorDialog('Es ist was schief gelaufen.')
                    }
                })
            })

        });

        document.querySelector('#refresh').addEventListener('click', ()=>{

            this.rootWindow.openConfirmDialog("Die Literaturtypen dieses Projektes auf den aktuellen Stand bringen? Neu von dir erstellte Typen werden erhalten bleiben, aber Änderungen an den Standard-Typen werden überschrieben werden.", ()=>{
                fetch('/refreshTypes?project='+pname).then(resp => {
                    if(resp.status === 200) {
                        this.rootWindow.openAlertDialog('Die Literaturtypen und Styles sind jetzt auf dem neuesten Stand.');
                        setTimeout(()=>{
                            this.rootWindow.setMain('/projects/'+pname);
                        }, 500)
                    } else {
                        this.rootWindow.openErrorDialog('Es ist was schief gelaufen.')
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

        let rw = this.rootWindow;
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
                    rw.openErrorDialog('Du kannst nur .bib-Dateien hochladen.')
                    return
                }

                AnalyseAndSaveDroppdFile(<string>reader.result, project, rw);

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

new LiteraturePage();