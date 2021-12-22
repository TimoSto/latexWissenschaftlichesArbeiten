export default function DeleteEntry(key: string, project: string) {
    window.fetch('/delete/entry', {
        method: 'POST',
        body: JSON.stringify({Entry:key, Project: project})
    }).then((response) => {
        console.log(response.status)
        if( response.status == 200 ) {
            window.location.reload()
        }
    })
}