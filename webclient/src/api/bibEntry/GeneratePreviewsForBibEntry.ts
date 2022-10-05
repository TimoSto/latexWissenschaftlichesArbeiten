import {Field} from "@/api/bibType/BibType";

//TODO: mit Model generate vereinheitlichen
//TODO: unittests
export default function GeneratePreviewsForBibEntry(bibFields: Field[], citeFields: Field[], values: string[]): [string, string] {
    let bibPreview = '';
    bibFields.forEach((field, i) => {
        bibPreview += field.Prefix

        switch (field.Style) {
            case 'italic':
                bibPreview += `<i>`;
                break;
            case 'bold':
                bibPreview += '<b>';
                break;
        }

        bibPreview += values[i] ? values[i] : '';

        switch (field.Style) {
            case 'italic':
                bibPreview += `</i>`;
                break;
            case 'bold':
                bibPreview += '</b>';
                break;
        }

        bibPreview += field.Suffix;
    })

    let citePreview = '';
    const bib = bibFields.map(field=>field.Field);

    let foundInBib = 0;
    citeFields.forEach((field, i) => {
        citePreview += field.Prefix

        switch (field.Style) {
            case 'italic':
                citePreview += `<i>`;
                break;
            case 'bold':
                citePreview += '<b>';
                break;
        }

        const indInBib = bib.indexOf(field.Field);
        if( indInBib >= 0 ) {
            citePreview += values[indInBib] ? values[indInBib] : '';
            foundInBib++;
        } else {
            citePreview += values[bibFields.length  + i - foundInBib] ? values[bibFields.length  + i - foundInBib] : '';
        }

        switch (field.Style) {
            case 'italic':
                citePreview += `</i>`;
                break;
            case 'bold':
                citePreview += '</b>';
                break;
        }

        citePreview += field.Suffix;
    });

    if ( citePreview.charAt(citePreview.length-1) === ' ' ) {
        citePreview += 'S. x'
    }

    return [bibPreview, citePreview];

}