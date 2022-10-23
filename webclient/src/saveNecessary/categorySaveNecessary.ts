import {MyState} from "@/store/MyState";
import {Field} from "@/api/bibTypes/BibType";

export function CategorySaveNecessary(state: MyState, index: number, name: string, citaviCategory: string, citaviNecessaryFields: string [], fields: Field[], citeFields: Field[]): boolean {
    if( index === -1 ) {
        return true
    }

    return name !== state.ProjectView.CurrentProjectData.bibTypes[index].Name ||
        citaviCategory !== state.ProjectView.CurrentProjectData.bibTypes[index].CitaviType ||
        JSON.stringify(citaviNecessaryFields) !== JSON.stringify(state.ProjectView.CurrentProjectData.bibTypes[index].CitaviNecessaryFields) ||
        JSON.stringify(fields) !== JSON.stringify(state.ProjectView.CurrentProjectData.bibTypes[index].Fields) ||
        JSON.stringify(citeFields) !== JSON.stringify(state.ProjectView.CurrentProjectData.bibTypes[index].CiteFields);
}

