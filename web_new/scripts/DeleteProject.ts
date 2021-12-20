
export default function DeleteProject(name: string) {
    fetch('/delete/project', {
        method: 'POST',
        body: JSON.stringify({Name: name})
    }).then(resp => {
        if(resp.status == 200) {
            window.location.reload()
        }
    })
}