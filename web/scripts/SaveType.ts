import Field from "./Field";

export default function SaveType(name: string, initialName: string, bibFields: Field[], citeFields: Field[]) {
    console.log(citeFields)
    let obj = {
        Name: name,
        Fields: bibFields,
        CiteFields: citeFields
    }
    return window.fetch('/save?initialName='+initialName, {
        method: 'POST',
        body: JSON.stringify(obj)
    }).then(response => {
        console.log(response);

        if( response.status === 200 ){
            return true
        }
    });


}