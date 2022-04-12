import {ParseBibToString, ParseStringToTeX} from "./TeXParser";
import SaveEntry from "./SaveEntry";

export default function AnalyseAndSaveDroppdFile(file: String, project: string) {

    if(file.indexOf('@') == -1) {
        (<any>window.parent).openErrorDialog('Die Datei hat ein ungültiges Format.')
        return
    }
    //remove stuff before first '@'
    file = file.substr(file.indexOf('@'));

    //remove all linebreaks to have consistent format over all exports (Springer vs. IEEE vs. ...)
    file = file.replaceAll('\n', '');
    file = file.replaceAll('\r', '');

    //type = string between first '@' and first '{'
    let type = file.substring(1, file.indexOf('{')).toLowerCase();
    //remove type and surrounding '{}'
    file = file.substring(file.indexOf('{') + 1, file.lastIndexOf('}'))

    //key ist string before first ',#
    let key = file.substring(0, file.indexOf(','));
    file = file.substring(file.indexOf(',') + 1);

    //parsing file to valuepairs
    let valuepairs = [];

    while( file.length > 0 && valuepairs.length < 30 ) {
        //attr-name ist string before '=' without leading or trailing spaces
        let attr = file.substring(0, file.indexOf('='))
        while( attr.charAt(0) === ' ' ) {
            attr = attr.substring(1);
        }
        while( attr.charAt(attr.length-1) === ' ' ) {
            attr = attr.substring(0, attr.length - 1);
        }
        file = file.substring(file.indexOf('=') + 1);

        //to find value: string until first comma when all brackets are closed
        let commaIndex;
        let openBrackets = 0;
        for( let i = 0 ; i < file.length && !commaIndex ; i++ ) {
            if( file.charAt(i) === ',' && openBrackets == 0 || i === file.length-1) {
                commaIndex = i;
            } else if( file.charAt(i) === '{' ) {
                openBrackets ++;
            } else if( file.charAt(i) === '}' ) {
                openBrackets --;
            }
        }
        let value = file.substring(0,commaIndex);
        //remove possible leading and trailing spaces
        if( value.charAt(0) === ' ' ) {
            value = value.substring(1);
        }
        if( value.charAt(value.length-1) === ' ' ) {
            value = value.substring(0, value.length - 1);
        }
        //remove possible leading and trailing brackets
        while( value.charAt(0) === '{' ) {
            value = value.substring(1);
        }
        while( value.charAt(value.length-1) === '}' ) {
            value = value.substring(0, value.length - 1);
        }

        file = file.substring(commaIndex + 1)

        value = ParseBibToString(value);

        value = ParseStringToTeX(value);

        valuepairs.push([attr, value])
    }

    if( AttrExists(valuepairs, 'doi') ) {
        switch (type) {
            case "article":
                type = "citaviAufsatzDoi"
                break
            case "inbook":
                type = "citaviInbookDoi"
                break
            case "inproceedings":
                type = "citaviInProceedingsDoi"
                break
            case "incollection":
                type = "citaviInCollectionDoi"
                break
        }
    }

    let sortedvaluepairs = SortValues(valuepairs, type);

    SaveEntry('', project, sortedvaluepairs, type, key, '').then(valid => {
        if (valid) {

            (<any>window.parent).reloadMain();
            (<any>window.parent).setEdit('/editEntry?project='+project+'&entry='+key);
        } else {
            (<any>window.parent).openErrorDialog('Beim Versuch, die Citavi-Quelle hochzuladen, ist ein Fehler aufgetreten.')
        }
    });
}

function SortValues(valuepairs: string[][], type: string) {
    let sortedPairs = [];
    valuepairs.forEach(pair => {
        let index = getIndex(pair[0], type)
        if( index >= 0 ) {
            sortedPairs[index] = {Attr: pair[0], Value: pair[1]};
        }
    });
    return sortedPairs;
}

function AttrExists(valuepairs: string[][], attr: string): boolean {
    let found = false;
    valuepairs.forEach(pair => {
        if(pair[0] === attr) {
            found = true;
        }
    });
    return found
}

function getIndex(attr: string, type: string) {
    if (type == "citaviAufsatzDoi") {
        switch (attr) {
            case "author":
                return 0
            case "title":
                return 1
            case "journal":
                return 2
            case "volume":
                return 3
            case "pages":
                return 4
            case "year":
                return 5
            case "doi":
                return 6
        }
    } else if (type == "citaviInbookDoi") {
        switch (attr) {
            case "author":
                return 0
            case "year":
                return 1
            case "title":
                return 2
            case "bookTitle":
                return 3
            case "publisher":
                return 4
            case "address":
                return 5
            case "doi":
                return 6
        }
    } else if (type == "citaviInProceedingsDoi") {
        switch (attr) {
            case "author":
                return 0
            case "year":
                return 1
            case "title":
                return 2
            case "booktitle":
                return 3
            case "pages":
                return 4
            case "doi":
                return 5
        }
    } else if (type == "citaviInCollectionDoi") {
        switch (attr) {
            case "author":
                return 0
            case "year":
                return 1
            case "title":
                return 2
            case "booktitle":
                return 3
            case "pages":
                return 4
            case "publisher":
                return 5
            case "address":
                return 6
            case "doi":
                return 7
        }
    }
    return -1
}