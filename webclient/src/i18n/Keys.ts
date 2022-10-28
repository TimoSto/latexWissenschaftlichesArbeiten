
export type TranslationKeys = typeof i18nDictionary

export const i18nDictionary = {
    Common: {
        Discard: 'Common.Discard',
        Save: 'Common.Save',
        Abort: 'Common.Abort',
        Delete: 'Common.Delete',
        Close: 'Common.Close',
        MandatoryField: 'Common.MandatoryField',
        Upload: 'Common.Upload'
    },
    App: {
        TitleAppendixProjects: 'App.TitleAppendixProjects',
        Information: 'App.Information',
        Homepage: 'App.Homepage',
        Layout5050: 'App.Layout5050',
        Layout3070: 'App.Layout3070'
    },
    Home: {
        Welcome: 'Home.Welcome',
        Description: 'Home.Description',
        TemplateCard: {
            Title: 'Home.TemplateCard.Title',
            Content: 'Home.TemplateCard.Content'
        },
        BibCard: {
            Title: 'Home.BibCard.Title',
            Content: 'Home.BibCard.Content'
        },
        CVCard: {
            Title: 'Home.CVCard.Title',
            Content: 'Home.CVCard.Content'
        },
        ContactCard: {
            Title: 'Home.ContactCard.Title',
            Content: 'Home.ContactCard.Content'
        },
        ConfigCard: {
            Title: 'Home.ConfigCard.Title',
            Content: 'Home.ConfigCard.Content'
        }
    },
    Projects: {
        Info: {
            Description: 'Projects.Info.Description'
        },
        New: {
            Title: 'Projects.New.Title',
            Label: 'Projects.New.Label',
            AlreadyExists: 'Projects.New.AlreadyExists',
            NoSpaces: 'Projects.New.NoSpaces',
            Success: 'Projects.New.Success'
        },
        Overview: {
            DeleteProject: 'Projects.Overview.DeleteProject',
            DeleteProjectDialog: {
                Title: 'Projects.Overview.DeleteProjectDialog.Title',
                Content: 'Projects.Overview.DeleteProjectDialog.Content',
                Success: 'Projects.Overview.DeleteProjectDialog.Success'
            },
            Entries: 'Projects.Overview.Entries',
            UploadEntries: 'Projects.Overview.UploadEntries',
            UploadDialog: {
                Title: 'Projects.Overview.UploadDialog.Title',
                EntriesToUpload: 'Projects.Overview.UploadDialog.EntriesToUpload',
                UnknownEntries: 'Projects.Overview.UploadDialog.UnknownEntries',
                Override: 'Projects.Overview.UploadDialog.Override',
                Success: 'Projects.Overview.UploadDialog.Success'
            },
            EntriesTable: {
                Key: 'Projects.Overview.EntriesTable.Key',
                Category: 'Projects.Overview.EntriesTable.Category',
                Entry: 'Projects.Overview.EntriesTable.Entry',
                CiteCount: 'Projects.Overview.EntriesTable.CiteCount'
            },
            Types: 'Projects.Overview.Types',
            TypesTable: {
                Name: 'Projects.Overview.TypesTable.Name',
                EntryExample: 'Projects.Overview.TypesTable.EntryExample',
                CitaviType: 'Projects.Overview.TypesTable.CitaviType'
            },
        },
        CategoryEditor: {
            Title: 'Projects.CategoryEditor.Title',
            Properties: 'Projects.CategoryEditor.Properties',
            InitialName: 'Projects.CategoryEditor.InitialName',
            Name: 'Projects.CategoryEditor.Name',
            CitaviCategory: 'Projects.CategoryEditor.CitaviCategory',
            CitaviNecessaryFields: 'Projects.CategoryEditor.CitaviNecessaryFields',
            BibliographyEntry: 'Projects.CategoryEditor.BibliographyEntry',
            Cite: 'Projects.CategoryEditor.Cite',
            Attribute: 'Projects.CategoryEditor.Attribute',
            Style: 'Projects.CategoryEditor.Style',
            Prefix: 'Projects.CategoryEditor.Prefix',
            Suffix: 'Projects.CategoryEditor.Suffix',
            TeX_Value: 'Projects.CategoryEditor.TeX_Value',
            Normal: 'Projects.CategoryEditor.Normal',
            Italic: 'Projects.CategoryEditor.Italic',
            Success: 'Projects.CategoryEditor.Success',
            DeleteCategoryDialog: {
                Title: 'Projects.CategoryEditor.DeleteCategoryDialog.Title',
                Content: 'Projects.CategoryEditor.DeleteCategoryDialog.Content',
                Success: 'Projects.CategoryEditor.DeleteCategoryDialog.Success',
            },
            Rules: {
                NoSpaces: 'Projects.CategoryEditor.Rules.NoSpaces',
                NameNotAvailable: 'Projects.CategoryEditor.Rules.NameNotAvailable',
                AttributeNotAvailable: 'Projects.CategoryEditor.Rules.AttributeNotAvailable'
            }
        },
        EntryEditor: {
            Fields: 'Projects.EntryEditor.Fields',
            NewKey: 'Projects.EntryEditor.NewKey',
            Rules: {
                KeyNotAvailable: 'Projects.EntryEditor.Rules.KeyNotAvailable',
            },
            Success: 'Projects.EntryEditor.Success',
            DeleteEntryDialog: {
                Title: 'Projects.EntryEditor.DeleteEntryDialog.Title',
                Content: 'Projects.EntryEditor.DeleteEntryDialog.Content',
                Success: 'Projects.EntryEditor.DeleteEntryDialog.Success'
            },
        }
    },
    Config: {
        Title: 'Config.Title',
        DarkMode: 'Config.DarkMode',
        AutoOpen: 'Config.AutoOpen',
        Success: 'Config.Success'
    }
}