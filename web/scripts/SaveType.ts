import Field from "./Field";

export default function SaveType(name: string, bibFields: Field[], citeFields: Field[]) {
    let obj = {
        Name: name,
        Fields: bibFields,
        CiteFields: citeFields
    }
    window.fetch('/save', {
        method: 'POST',
        body: JSON.stringify(obj)
    }).then(response => {
        console.log(response);
    })
}