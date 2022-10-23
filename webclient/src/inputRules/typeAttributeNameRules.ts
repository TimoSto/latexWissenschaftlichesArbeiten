import {Field} from "@/api/bibTypes/BibType";
import {TranslateResult} from "vue-i18n";
import {i18nDictionary} from "@/i18n/Keys";

export function GetTypeAttributeNameRules(fields: Field[], i18n: (v: string) => TranslateResult) {
    return [
        (v: string) => {
            if( v === '' ) return i18n(i18nDictionary.Common.MandatoryField) as string
            if( fields.map(f => f.Field).filter(f => f === v).length > 1 ) return i18n(i18nDictionary.Projects.CategoryEditor.Rules.AttributeNotAvailable) as string

            return true
        }
    ]
}
