import {TranslateResult} from "vue-i18n";
import {i18nDictionary} from "@/i18n/Keys";

export default function ProjectNameRules(projectNames: string[], i18n: (v: string) => TranslateResult) {
    // const projectNames = projects;
    // console.log(projects);
    return [
        (value: string) => {
            if ( projectNames && projectNames.indexOf(value) !== -1) return i18n(i18nDictionary.App.TitleAppendixProjects) as string
            if ( value && value.indexOf(' ') >= 0 ) return i18n('Projektname darf kein Leerzeichen enthalten') as string
            return true
        }
    ]
}