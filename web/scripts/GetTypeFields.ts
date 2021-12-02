
export default function GetTypeFields(type: string) {
    fetch('/typeFields/' + type).then(response => response.json())
        .then(data => console.log(data));
}