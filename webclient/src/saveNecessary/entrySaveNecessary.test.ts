import {MyState} from "@/store/MyState";
import EntrySaveNecessary from "@/saveNecessary/entrySaveNecessary";

describe('entrySave necesary', () => {
    let state: MyState;
    beforeAll(() => {
        state = {
            App: {
                CurrentView: 'projects',
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
                            CitaviType: 'aufsatz',
                            CitaviNecessaryFields: [],
                            Fields: [
                                {
                                    Field: 'test1',
                                    Style: 'normal',
                                    Prefix: '',
                                    Suffix: ' ',
                                    TexValue: false,
                                    CitaviAttributes: []
                                },
                                {
                                    Field: 'test2',
                                    Style: 'italic',
                                    Prefix: '',
                                    Suffix: '.',
                                    TexValue: false,
                                    CitaviAttributes: []
                                }
                            ],
                            CiteFields: [],
                            Model: '',
                            CiteModel: ''
                        }
                    ],
                    bibEntries: [
                        {
                            Key: 'test1',
                            Typ: 'aufsatz',
                            Fields: ['hallo'],
                            CiteNumber: 0,
                            BibPreview: '',
                            CitePreview: ''
                        }
                    ],
                    abbreviations: []
                },
                EditorCloseNeeded: false,
                EditorIndexUpdate: -1
            }
        } as unknown as MyState
    });

    it('should not be necessary to save on no changes', () => {
        expect(EntrySaveNecessary(state, 0, 'test1', 'aufsatz', ['hallo'])).toBe(false);
    })

    it('should be necessary to save on new', () => {
        expect(EntrySaveNecessary(state, -1, 'test1', 'aufsatz', ['hallo'])).toBe(true);
    })

    it('should be necessary to save on change', () => {
        expect(EntrySaveNecessary(state, 0, 'test12', 'aufsatz', ['hallo'])).toBe(true);
    })

    it('should be necessary to save on change', () => {
        expect(EntrySaveNecessary(state, 0, 'test1', 'aufsatzf', ['hallo'])).toBe(true);
    })

    it('should be necessary to save on change', () => {
        expect(EntrySaveNecessary(state, 0, 'test1', 'aufsatz', ['halloda'])).toBe(true);
    })
})
