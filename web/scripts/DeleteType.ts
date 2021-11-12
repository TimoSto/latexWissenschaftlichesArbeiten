
export default function DeleteType(type: string) {
    window.fetch('/delete/type', {
        method: 'POST',
        body: JSON.stringify({Type:type})
    }).then(response => console.log(response))
}