import { ActionTree, ActionContext } from 'vuex';
import {state, State} from './state';
import { Mutations } from './mutations';
import { ActionTypes } from "@/store/action-types";
import {MutationTypes} from "@/store/mutation-types";
import GetProjects from "@/api/projects/GetProjects";
import GetBibTypes from "@/api/bibTypes/GetBibTypes";
import GetBibEntries from "@/api/bibEntries/GetBibEntries";
import CreateProject from "@/api/projects/CreateProject";
import router from "@/router";
import DeleteProject from "@/api/projects/DeleteProject";
import SaveType from "@/api/bibTypes/SaveBibType";
import SaveBibEntry from "@/api/bibEntries/SaveBibEntry";
import DeleteType from "@/api/bibTypes/DeleteType";
import DeleteEntry from "@/api/bibEntries/DeleteEntry";
import Translate from "@/api/translator/Translator";
import BackupProject from "@/api/projects/BackupProject";
import RefreshTypes from "@/api/bibTypes/RefreshTypes";
import SetDefault from "@/api/bibTypes/SetDefault";
import CleanupCites from "@/api/projects/CleanupCites";
import UploadEntries from "@/api/bibEntries/UploadEntries";
import {ParseStringToTeX, ParseTexToString} from "@/api/TeX-JSON-converter/TeXParser";

export type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
    [ActionTypes.GET_PROJECTS](
        { commit }: AugmentedActionContext,
        payload: undefined
    ): Promise<void>;
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.GET_PROJECTS]({ commit }) {

        const obj = await GetProjects();

        commit(MutationTypes.SET_PROJECTS, obj)
    },
    async [ActionTypes.GET_BIBTYPES]({ commit }) {

        const obj = await GetBibTypes(this.state.project);

        commit(MutationTypes.SET_BIBTYPES, obj)

        if( state.typeToEdit ) {
            commit(MutationTypes.SET_TYPE_TO_EDIT, state.typeToEdit.Name ? state.typeToEdit.Name : '')
        }
    },
    async [ActionTypes.GET_BIBENTRIES]({ commit }) {

        const obj = await GetBibEntries(this.state.project);

        commit(MutationTypes.SET_BIBENTRIES, obj)
    },
    async [ActionTypes.CREATE_PROJECT]({ commit, dispatch }, payload) {

        const success = await CreateProject(payload)

        if( success ) {
            dispatch(ActionTypes.GET_PROJECTS);
            commit(MutationTypes.SET_PROJECT, payload)
            await router.push('/project/' + payload)
        } else {
            state.errorMessage = 'Projekt erfolgreich erstellt.';
        }

    },

    async [ActionTypes.DELETE_PROJECT]({ dispatch, commit }, payload) {

        const success = await DeleteProject(payload)

        if( success ) {
            dispatch(ActionTypes.GET_PROJECTS);
            commit(MutationTypes.SET_SNACKBAR, `Projekt '${state.project}' wurde gelöscht.`);
            await router.push('/')
        }

    },

    async [ActionTypes.SAVE_TYPE]({ dispatch, commit }, obj) {

        const resp = await SaveType(obj)

        if( resp.ok ) {
            dispatch(ActionTypes.GET_BIBTYPES);
            state.initialType = JSON.parse(JSON.stringify(state.typeToEdit))
            commit(MutationTypes.SET_SNACKBAR, `Literaturtyp erfolgreich gespeichert.`);
        } else {
            const errorMsg = await resp.text();
            state.errorMessage = Translate(errorMsg);
        }

    },

    async [ActionTypes.SAVE_ENTRY]({ dispatch, commit }) {

        for( let i = 0 ; i < state.bibTypes.length ; i++ ) {
            if( state.bibTypes[i].Name === state.entryToEdit.Typ) {
                for( let i = 0; i < state.bibTypes[i].Fields.length ; i++ ) {
                    if (i < state.entryToEdit.Fields.length) {
                        if ( !state.bibTypes[i].Fields[i].TexParsed ) {
                            state.entryToEdit.Fields[i] = ParseStringToTeX(state.entryToEdit.Fields[i]);
                            state.entryToEdit.Fields[i] = state.entryToEdit.Fields[i].replaceAll('{{\\&}}','{{\\&amp;}}')
                        }
                    }
                }
            }
        }

        const SaveObj = {
            InitialKey: state.initialEntry.Key,
            Project: state.project,
            Entry: {
                Key: state.entryToEdit.Key,
                Typ: state.entryToEdit.Typ,
                Fields: state.entryToEdit.Fields,
            }
        }

        const jsonObj = JSON.stringify(SaveObj)

        const resp = await SaveBibEntry(jsonObj)

        if( resp.ok ) {
            dispatch(ActionTypes.GET_BIBENTRIES);
            state.initialEntry = JSON.parse(JSON.stringify(state.entryToEdit))
            state.initialEntry.BibPreview = '';
            state.initialEntry.CitePreview = '';
            commit(MutationTypes.UPDATE_TEX_PARSING_OF_ENTRY)
            commit(MutationTypes.UPDATE_PREVIEW);
            commit(MutationTypes.SET_SNACKBAR, `Literatureintrag erfolgreich gespeichert.`);
        } else {
            const errorMsg = await resp.text();
            state.errorMessage = Translate(errorMsg);
        }

    },

    async [ActionTypes.DELETE_TYPE]({ commit, dispatch }, payload:{project: string, name: string}) {

        const success = await DeleteType(payload.project, payload.name)

        if( success ) {
            dispatch(ActionTypes.GET_BIBTYPES);
            commit(MutationTypes.SET_TYPE_TO_EDIT, '');
            commit(MutationTypes.SET_SNACKBAR, `Literaturtyp '${payload.name}' wurde aus Projekt '${state.project}' gelöscht.`);
        }

    },

    async [ActionTypes.DELETE_ENTRY]({ commit, dispatch }, payload:{project: string, key: string}) {

        const success = await DeleteEntry(payload.project, payload.key)

        if( success ) {
            dispatch(ActionTypes.GET_BIBENTRIES);
            commit(MutationTypes.SET_ENTRY_TO_EDIT, '');
            commit(MutationTypes.SET_SNACKBAR, `Literatureintrag '${payload.key}' wurde aus Projekt '${state.project}' gelöscht.`);
        }

    },

    async [ActionTypes.BACKUP_PROJECT]({ commit }) {

        const resp = await BackupProject(state.project)

        if( resp.ok ) {
            const str = await resp.text();
            commit(MutationTypes.SET_SNACKBAR, Translate(str));
        }

    },

    async [ActionTypes.REFRESH_TYPES]({commit, dispatch}) {
        const resp = await RefreshTypes(state.project);

        if( resp.ok ) {
            dispatch(ActionTypes.GET_BIBTYPES);
            commit(MutationTypes.SET_SNACKBAR, `Die Standard-Literaturtypen für das Projekt '${state.project}' wurden auf den Standard zurückgesetzt.`);
        }
    },

    async [ActionTypes.SET_DEFAULT]({commit}) {
        const resp = await SetDefault(state.project);

        if( resp.ok ) {
            commit(MutationTypes.SET_SNACKBAR, `Der jetzige Stand der Literaturtypen im Projekt '${state.project}' wird von nun an als Standard verwendet.`);
        }
    },

    async [ActionTypes.CLEANUP_CITES]({commit}) {
        const resp = await CleanupCites(state.project);

        if( resp.ok ) {
            commit(MutationTypes.SET_SNACKBAR, `Das Literaturverzeichnis des Projektes '${state.project}' enthält nun nurnoch die zum jetzigen Zeitpunkt zitierten Einträge.`);
        }
    },

    async [ActionTypes.UPLOAD_DROPPED]({commit, dispatch}) {
        const resp = await UploadEntries(state.dragNDropResp.Entries, state.project)

        if( resp.ok ) {
            commit(MutationTypes.SET_SNACKBAR, `Literatureinträge erfolgreich hinzugefügt.`);
            commit(MutationTypes.SET_DRAG_N_DROP_RESULT, {
                Valid: false,
                Entries: [],
                Message: '',
            });
            dispatch(ActionTypes.GET_BIBENTRIES);
        }
    }
};