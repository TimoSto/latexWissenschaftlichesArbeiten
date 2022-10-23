import {MutationTree} from "vuex";
import {MyState, MyStateObj} from "@/store/MyState";
import MutationTypes from "@/store/MutationTypes";
import {RemoveProject, SetConfig, SetCurrentView, SetProjectNames} from "@/store/mutations/appMutations";
import {AddProject, SetCurrentProject, SetProjectData} from "@/store/mutations/projectsViewMutations";
import {ProjectData} from "@/api/projects/GetProjectData";
import {UpdateType, RemoveType} from "@/store/mutations/categoryEditorMutations";
import {BibType} from "@/api/bibTypes/BibType";
import {BibEntry} from "@/api/bibEntries/Entry";
import {UpdateEntry} from "@/store/mutations/entryEditorMutations";

export const mutations: MutationTree<MyState> = {
    [MutationTypes.App.SetCurrentView](state: MyState, payload: string) {
        SetCurrentView(state, payload);
    },
    [MutationTypes.App.SetProjectNames](state: MyState, payload: string[]) {
        SetProjectNames(state, payload);
    },
    [MutationTypes.ProjectView.SetCurrentProject](state: MyState, payload: string) {
        SetCurrentProject(state, payload);
    },
    [MutationTypes.ProjectView.AddProject](state: MyState, payload: string) {
        AddProject(state, payload);
    },
    [MutationTypes.ProjectView.SetCurrentProjectData](state: MyState, payload: ProjectData) {
        SetProjectData(state, payload);
    },
    [MutationTypes.App.SetConfig](state: MyState, payload: { AutoOpenBrowser: boolean, DarkMode: boolean, Port: string }) {
        SetConfig(state, payload);
    },
    [MutationTypes.App.RemoveProject](state: MyState, payload: string) {
        RemoveProject(state, payload);
    },
    [MutationTypes.CategoryEditor.RemoveType](state: MyState, payload: string) {
        RemoveType(state, payload)
    },
    [MutationTypes.CategoryEditor.UpdateType](state: MyState, payload: {Type: BibType, initialName: string}) {
        UpdateType(state, payload)
    },
    [MutationTypes.ProjectView.EditorCloseNeeded](state: MyState, payload: boolean) {
        state.ProjectView.EditorCloseNeeded = payload;
    },
    [MutationTypes.ProjectView.SetEditorUpdateIndex](state: MyState, payload: {v: string, entry: boolean}) {
        state.ProjectView.EditorIndexUpdate = payload.entry ?
            state.ProjectView.CurrentProjectData.bibEntries.map(t => t.Key).indexOf(payload.v) :
            state.ProjectView.CurrentProjectData.bibTypes.map(t => t.Name).indexOf(payload.v);
    },
    [MutationTypes.EntryEditor.UpdateEntry](state: MyState, payload: {Entry: BibEntry, initialKey: string}) {
        UpdateEntry(state, payload)
    }
}