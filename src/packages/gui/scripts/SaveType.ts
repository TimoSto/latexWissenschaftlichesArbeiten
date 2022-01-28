import Field from "./Field";

export default function SaveType(project: string, name: string, initialName: string, bibFields: Field[], citeFields: Field[]) {
    console.log(citeFields)
    let obj = {
        Name: name,
        Fields: bibFields,
        CiteFields: citeFields,
        InitialName: initialName,
        Project: project
    }
    return window.fetch('/saveType', {
        method: 'POST',
        body: JSON.stringify(obj)
    }).then(response => {
        console.log(response);

        if( response.status === 200 ){
            return true
        }
    });


}