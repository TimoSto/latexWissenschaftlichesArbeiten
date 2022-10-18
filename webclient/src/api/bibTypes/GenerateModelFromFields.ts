import {Field} from "@/api/bibTypes/BibType";

export function GenerateModelFromFields(fields: Field[]): string{
    let model = '';
    fields.forEach( (field: Field) => {

        model += field.Prefix

        switch (field.Style) {
            case 'italic':
                model += `<i>`;
                break;
            case 'bold':
                model += '<b>';
                break;
        }

       model += field.Field

        switch (field.Style) {
            case 'italic':
                model += `</i>`;
                break;
            case 'bold':
                model += '</b>';
                break;
        }

        model += field.Suffix;

    });

    return model
}