
export default function SaveProjectName(name: string, initialName: string) {
    let obj = {
        Name: name,
        InitialName: initialName
    }
    return window.fetch('/saveProjectName', {
        method: 'POST',
        body: JSON.stringify(obj)
    }).then(response => {
        console.log(response);

        if( response.status === 200 ){
            (<any>window).lapi.ReloadOverview();
            window.location.replace('/project/'+name);
            return true
        }
    });
}