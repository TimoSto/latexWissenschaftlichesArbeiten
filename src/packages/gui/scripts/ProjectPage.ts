

class ProjectPage {

    constructor() {
        document.addEventListener('DOMContentLoaded', ()=>{
            this.init()
        })
    }

    private init() {

        let pname = window.location.href.split('/projects/')[1]

        document.querySelector('#editStyles').addEventListener('click', ()=>{
            (<any>window.parent).setMain('/editor.html?project=' + pname)
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

        let bibFrame = document.querySelector('#literature_view') as HTMLIFrameElement;
        bibFrame.src = '/literature?project='+pname;
    }
}

new ProjectPage();