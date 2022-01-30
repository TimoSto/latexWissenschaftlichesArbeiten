
export default function AnalyseAndSaveDroppdFile(file: String) {
    console.log(file);

    let texType = file.match('(@.*?\{)')[0];
    texType = texType.substr(1, texType.length - 2);
    let key = file.match('({.*?,)')[0]
    key = key.substr(1, key.length - 2);
    console.log(key);

    let lines = file.split('\n');
    let jsonString = '{\n'
    for (let i=3 ; i< lines.length; i++){
        if(lines[i] === '}') break
        lines[i] = lines[i].substr(1);
        let parts = lines[i].split(' = ');
        console.log(parts)
        let attr = '';
        switch (parts[0]) {
            case 'author': attr = 'Autor'; break;
            case 'year': attr = 'Jahr'; break;
            case 'title': attr = 'Titel'; break;
            case 'pages': attr = 'Seiten'; break;
            case 'volume': attr = 'Ausgabe'; break;
            case 'journal': attr = 'Zeitschrift'; break;
            case 'doi': attr = 'Doi'; break;
        }
        if( attr.length > 0) {
            let value = parts[1].substr(1, parts[1].length - 4);
            jsonString += '"' + attr + '": "' + value + '",\n'
        }
    }
    jsonString += '}'

    jsonString.replaceAll('{\&}','{{\&}}')
    let obj = JSON.parse(jsonString)
    console.log(obj)
}