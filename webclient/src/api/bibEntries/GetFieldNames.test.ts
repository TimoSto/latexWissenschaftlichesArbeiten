import {MyState} from "@/store/MyState";
import {BibType, Field} from "@/api/bibTypes/BibType";
import GetFieldNames from "@/api/bibEntries/GetFieldNames";

describe('getFieldNames', () => {
    let state: MyState;
    beforeAll(() => {
        state = {
            App: {
                CurrentView: 'home',
                ProjectNames: [],
                Config: {
                    AutoOpenBrowser: false,
                    DarkMode: false,
                    Port: ''
                },
                Loaded: false
            },
            ProjectView: {
                CurrentProject: '',
                CurrentProjectData: {
                    backupPaths: [],
                    bibTypes: [
                        {
                            Name: 'test1',
                            Fields: [
                                {
                                    Field: 't1'
                                } as Field,
                                {
                                    Field: 't2'
                                } as Field,
                                {
                                    Field: 't3'
                                } as Field,
                            ],
                            CiteFields: [
                                {
                                    Field: 't1'
                                } as Field,
                                {
                                    Field: 't4'
                                } as Field
                            ]

                        } as BibType
                    ],
                    bibEntries: [],
                    abbreviations: []
                },
                EditorCloseNeeded: false,
                EditorIndexUpdate: -1
            }
        } as unknown as MyState
    });

    it('should give 4 fields', () => {
        const res = GetFieldNames(state, 'test1')
        expect(res).toHaveLength(4)
        expect(res).toEqual(['t1', 't2', 't3', 't4'])
    })

    it('should give 3 fields with empty citefields', () => {
        state.ProjectView.CurrentProjectData.bibTypes[0].CiteFields = [];
        const res = GetFieldNames(state, 'test1')
        expect(res).toHaveLength(3)

        expect(res).toEqual(['t1', 't2', 't3'])
    })
})
