import {BibEntry} from "@/api/bibEntries/Entry";
import {TranslateResult} from "vue-i18n";
import {i18nDictionary} from "@/i18n/Keys";

export function GetEntryKeyRules(index: number, entries: BibEntry[], i18n: (v: string) => TranslateResult) {
    return [
        (v: string) => {
        if(v.length === 0) return i18n(i18nDictionary.Common.MandatoryField) as string
        if( entries.map(e => e.Key).indexOf(v) !== -1 && entries.map(e => e.Key).indexOf(v) !== index ) return i18n(i18nDictionary.Projects.EntryEditor.Rules.KeyNotAvailable) as string;

        return true
        }
    ]
}
