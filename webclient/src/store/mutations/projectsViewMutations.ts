import {MyState} from "@/store/MyState";
import {ProjectData} from "@/api/projects/GetProjectData";
import {BibType} from "@/api/bibTypes/BibType";
import {GenerateModelFromFields} from "@/api/bibTypes/GenerateModelFromFields";
import {BibEntry} from "@/api/bibEntries/Entry";
import GeneratePreviewsForBibEntry from "@/api/bibEntries/GeneratePreviewsForBibEntry";
import {ParseTeXToString} from "@/api/bibEntries/ParseTeXString";

export function SetCurrentProject(state: MyState, project: string) {
    state.ProjectView.CurrentProject = project;
}

export function AddProject(state: MyState, project: string) {
    state.App.ProjectNames.push(project);
    state.App.ProjectNames.sort((a,b) => {
        if( a < b ) return -1
        return 0
    })
}

export function SetProjectData(state: MyState, data: ProjectData) {
    data.BibEntries.forEach((e:BibEntry, i: number) => {
        const bType = data.BibTypes.find(t => t.Name === e.Typ);

        if( bType ) {
            const bibFieldNames = bType.Fields.map(f => f.Field);
            const citeFields = bType.CiteFields.filter(f => bibFieldNames.indexOf(f.Field) === -1);

            e.Fields.forEach((f:string, j: number) => {
                if( j < bType.Fields.length ) {
                    if( !bType.Fields[j].TexValue ) {
                        data.BibEntries[i].Fields[j] = ParseTeXToString(f)
                    }
                } else {
                    if( !citeFields[j - bibFieldNames.length].TexValue ) {
                        data.BibEntries[i].Fields[j] = ParseTeXToString(f)
                    }
                }
            })

            const previews = GeneratePreviewsForBibEntry(bType.Fields, bType.CiteFields, e.Fields)
            data.BibEntries[i].BibPreview = previews[0];
            data.BibEntries[i].CitePreview = previews[1];
        }
    })
    state.ProjectView.CurrentProjectData.bibEntries = data.BibEntries;
    data.BibTypes.forEach((t: BibType, i: number) => {
        if( !t.CitaviType || t.CitaviType === '' ) {
            data.BibTypes[i].CitaviType = '/';
        }
        data.BibTypes[i].Model = GenerateModelFromFields(t.Fields)
    })
    state.ProjectView.CurrentProjectData.bibTypes = data.BibTypes;
}
