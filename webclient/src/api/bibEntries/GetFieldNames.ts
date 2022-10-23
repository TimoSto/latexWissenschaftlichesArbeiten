import {MyState} from "@/store/MyState";
import {BibType, Field} from "@/api/bibTypes/BibType";

export default function GetFieldNames(state: MyState, categoryName: string): string[] {
    if( categoryName !== '' ) {
        const category: BibType = state.ProjectView.CurrentProjectData.bibTypes.find((t: BibType) => t.Name === categoryName) as BibType;

        let fields = [] as string[]
        let citeFields = [] as string[]
        if( category ) {
            fields = category.Fields.map((f: Field) => f.Field)
            citeFields = category.CiteFields.map((f: Field) => f.Field)
        }
        citeFields.forEach((f: string) => {
            if( fields.indexOf(f) === -1 ) {
                fields.push(f)
            }
        });
        return fields;
    }
    return []
}
