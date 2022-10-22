import {BibType} from "@/api/bibTypes/BibType";
import {TranslateResult} from "vue-i18n";
import {i18nDictionary} from "@/i18n/Keys";

export default function GetTypeNameRules(existingTypes: BibType[], initialName: string, i18n: (v: string) => TranslateResult) {

    return [
        (value: string) => {
            if( value.length === 0) return i18n(i18nDictionary.Common.MandatoryField) as string
            if( value.indexOf(' ') >= 0 ) return i18n(i18nDictionary.Projects.CategoryEditor.Rules.NoSpaces) as string
            if( existingTypes.map(t => t.Name).indexOf(value) >= 0 && value !== initialName ) return i18n(i18nDictionary.Projects.CategoryEditor.Rules.NameNotAvailable) as string

            return true
        }
    ]
}
