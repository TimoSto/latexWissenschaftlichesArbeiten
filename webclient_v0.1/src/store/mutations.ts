import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import {State} from './state';
import {BibType, CreateField, Field} from "@/api/bibTypes/BibType";
import {BibEntry} from "@/api/bibEntries/BibEntry";
import {GenerateModelForBibType} from "@/api/bibTypes/GenerateModelForBibTypes";
import GeneratePreviewsForBibEntry from "@/api/bibEntries/GeneratePreviewsForBibEntry";
import {DragNDropResp} from "@/api/TeX-JSON-converter/AnalyseDroppedFiles";
import {ParseStringToTeX, ParseTexToString} from "@/api/TeX-JSON-converter/TeXParser";
export type Mutations<S = State> = {
    [MutationTypes.SET_PROJECT](state: S, payload: string): void;
    [MutationTypes.SET_PROJECTS](state: S, payload: string[]): void;
};

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_PROJECT](state, payload: string) {
        state.project = payload
        state.typeToEdit = <BibType>{}
    },
    [MutationTypes.SET_PROJECTS](state, payload: string[]) {
        state.projects = payload
    },
    [MutationTypes.SET_BIBTYPES](state, payload: BibType[]) {
        state.bibTypes = payload
    },
    [MutationTypes.SET_BIBENTRIES](state, payload: BibEntry[]) {
        state.bibEntries = payload
    },
    [MutationTypes.UPDATE_MODEL_FOR_TYPE](state) {
        state.typeToEdit.Model = GenerateModelForBibType(state.typeToEdit.Fields);
    },
    [MutationTypes.UPDATE_CITE_MODEL_FOR_TYPE](state) {
        state.typeToEdit.CiteModel = GenerateModelForBibType(state.typeToEdit.CiteFields);
    },
    [MutationTypes.SET_TYPE_TO_EDIT](state, payload: string) {
        if(payload.length == 0) {
            state.typeToEdit = <BibType>{}
            state.initialType = <BibType>{}
        } else {
            state.entryToEdit = <BibEntry>{};
            state.initialEntry =<BibEntry>{};
            state.richEditorOpened = false;
            state.bibTypes.forEach(bType => {
                if( bType.Name === payload ) {
                    state.typeToEdit = JSON.parse(JSON.stringify(bType));
                    state.initialType = JSON.parse(JSON.stringify(bType));
                }
            });
        }

    },
    [MutationTypes.RM_BIB_ATTR](state, payload: number) {
        state.typeToEdit.Fields.splice(payload, 1)
    },
    [MutationTypes.RM_CITE_ATTR](state, payload: number) {
        state.typeToEdit.CiteFields.splice(payload, 1)
    },
    [MutationTypes.ADD_BIB_ATTR](state) {
        state.typeToEdit.Fields.push(CreateField(
            '',
            'normal',
            '',
            '',
        ));
    },
    [MutationTypes.ADD_CITE_ATTR](state) {
        state.typeToEdit.CiteFields.push(CreateField(
            '',
            'normal',
            '',
            '',
        ));
    },
    [MutationTypes.NEW_TYPE](state){
        state.typeToEdit = <BibType>{
            Name: '',
            Fields: <Field[]>[],
            CiteFields: <Field[]>[],
        }
        state.initialType = <BibType>{
            Name: '',
            Fields: <Field[]>[],
            CiteFields: <Field[]>[],
        }
        state.richEditorOpened = false;
    },
    [MutationTypes.CLEANUP_FIELDS](state){
        const bibToRm = <number[]>[]
        state.typeToEdit.Fields.forEach((field, i) => {
           if( field.Field.length === 0 ) {
               bibToRm.push(i);
           }
        });
        for( let i = 0 ; i < bibToRm.length ;  i++ ) {
            state.typeToEdit.Fields.splice(bibToRm[i]-i, 1);
        }

        const citeToRm = <number[]>[]
        state.typeToEdit.CiteFields.forEach((field, i) => {
            if( field.Field.length === 0 ) {
                citeToRm.push(i);
            }
        });
        for( let i = 0 ; i < citeToRm.length ;  i++ ) {
            state.typeToEdit.CiteFields.splice(citeToRm[i]-i, 1);
        }
    },
    [MutationTypes.TOGGLE_TWO_THIRDS](state){
        state.twoThirdsActive = !state.twoThirdsActive;
        localStorage.setItem('ThesorTeX_TwoThirdsActive', String(state.twoThirdsActive))
    },
    [MutationTypes.SET_ENTRY_TO_EDIT](state, payload: string) {
        state.initialInput = false;

        if(payload.length == 0) {
            state.entryToEdit = <BibEntry>{};
            state.initialEntry = <BibEntry>{};
        } else {
            state.typeToEdit = <BibType>{};
            state.initialType = <BibType>{};
            state.richEditorOpened = false;
            state.bibEntries.forEach(bEntry => {
                if( bEntry.Key === payload ) {
                    state.entryToEdit = JSON.parse(JSON.stringify(bEntry));
                    state.initialEntry = JSON.parse(JSON.stringify(bEntry));
                    state.initialEntry.BibPreview = '';
                    state.initialEntry.CitePreview = '';
                }
            });
        }

    },
    [MutationTypes.UPDATE_PREVIEW](state) {
        state.bibTypes.forEach(bType => {
            if( bType.Name === state.entryToEdit.Typ ) {
                const arr = GeneratePreviewsForBibEntry(bType.Fields, bType.CiteFields, state.entryToEdit.Fields);
                state.entryToEdit.BibPreview = arr [0];
                state.entryToEdit.CitePreview = arr [1];
            }
        })

    },
    [MutationTypes.NEW_ENTRY](state){
        state.initialInput = true;
        state.entryToEdit = <BibEntry>{
            Key: '',
            Typ: '',
            Fields: <string[]>[],
            BibPreview: '',
            CitePreview: '',
            CiteNumber: 0
        }
        state.initialEntry = <BibEntry>{
            Key: '',
            Typ: '',
            Fields: <string[]>[],
            BibPreview: '',
            CitePreview: '',
            CiteNumber: 0
        }
        state.richEditorOpened = false;
    },
    [MutationTypes.CLEAR_ERROR](state){
        state.errorMessage = '';
    },
    [MutationTypes.SET_SNACKBAR](state, payload: string){
        state.snackbarMessage = payload;
        setTimeout(()=>{
            state.snackbarMessage = '';
        }, 5000);
    },
    [MutationTypes.SET_DRAG_N_DROP_RESULT](state, payload: DragNDropResp){
        state.dragNDropResp = payload;
        state.errorMessage = payload.Valid ? '' : payload.Message;
    },
    [MutationTypes.DO_INPUT_AFTER_INITIAL](state) {
        state.initialInput = false;
    },
    [MutationTypes.UPDATE_TEX_PARSING_OF_ENTRY](state, payload: boolean) {

        for( let i = 0; i < state.bibTypes.length ; i++ ) {
            if ( state.bibTypes[i].Name === state.entryToEdit.Typ ) {
                const bibType = state.bibTypes[i];
                for( let i = 0; i < bibType.Fields.length ; i++ ) {
                    if( i < state.entryToEdit.Fields.length ) {
                        if( !bibType.Fields[i].TexValue ) {
                            state.entryToEdit.Fields[i] = ParseTexToString(state.entryToEdit.Fields[i]);
                        }
                    }
                    if( payload ) {
                        if( i < state.initialEntry.Fields.length ) {
                            if( !bibType.Fields[i].TexValue ) {
                                state.initialEntry.Fields[i] = ParseTexToString(state.initialEntry.Fields[i]);
                            }
                        }
                    }
                }
                break;
            }
        }
    },
    [MutationTypes.TOGGLE_EDITOR](state) {
        state.richEditorOpened = !state.richEditorOpened;
    }
};