import Field from "./Field";

export default function SaveType(name: string, bibFields: Field[], citeFields: Field[], reload?: boolean) {
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

        if(reload) {
            window.location.reload();
        }

        (<any>window.parent).shell.NavigateToType(name)
    });


}