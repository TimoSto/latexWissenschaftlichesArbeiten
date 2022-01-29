
export default function AnalyseAndSaveDroppdFile(file: String) {
    console.log(file);

    let texType = file.match('(@.*?\{)')[0];
    texType = texType.substr(1, texType.length - 2);
    console.log(texType)
}