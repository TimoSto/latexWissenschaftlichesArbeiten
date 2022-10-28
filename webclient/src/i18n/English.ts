import {TranslationKeys} from "@/i18n/Keys";

export const EnglishTranslations: TranslationKeys = {
    Common: {
        Discard: 'Discard',
        Save: 'Save',
        Abort: 'Abort',
        Delete: 'Delete',
        Close: 'Close',
        MandatoryField: '*mandatory field',
        Upload: 'Upload'
    },
    App: {
        TitleAppendixProjects: 'Projects',
        Information: 'Information',
        Homepage: 'Homepage',
        Layout5050: '50:50 layout',
        Layout3070: '30:70 layout'
    },
    Home: {
        Welcome: 'Welcome to ThesorTeX!',
        Description: 'This tool supports you in the usage of LaTeX.',
        TemplateCard: {
            Title: 'Template',
            Content: 'You can download a template-project here. It meets some requirements for thesises, like bibmanagement, header, footer and cites. Go to the documentation for more information.'
        },
        BibCard: {
            Title: 'Bibliography management',
            Content: 'The template uses an own bib-system. You can choose attributes for the bibliography-entry and cites. You can also import your bibliography from citavi. Look to the documentation for more information.'
        },
        CVCard: {
            Title: 'Curriculum Vitae template',
            Content: 'Download template'
        },
        ContactCard: {
            Title: 'Contact',
            Content: 'If you are missing a feature or you encounter an error, feel free to create an Issue in Github..'
        },
        ConfigCard: {
            Title: 'Configuration',
            Content: 'Global Settings of the app'
        }
    },
    Projects: {
        Info: {
            Description: 'A Project contains bibtypes, bibentries, abbreviations, formatting (.sty-files) and texts (.tex-files). The bib-entries, -types and abbreviations can be managed in this application. Click on the <i>+</i> to create a ne project.'
        },
        New: {
            Title: 'Create new project',
            Label: 'Projectname',
            AlreadyExists: 'Project with this name already exists',
            NoSpaces: 'No Spaces in project name allowed',
            Success: 'New project successfully created'
        },
        Overview: {
            CreateBackup: 'Create backup',
            LoadBackup: 'Load backup',
            DeleteProject: 'Delete project',
            DeleteProjectDialog: {
                Title: 'Delete current project?',
                Content: 'Are you sure you want to delete the current project? Your backups will remain.',
                Success: 'Project successfully deleted'
            },
            Entries: 'Entries in bibliography',
            UploadEntries: 'Upload a bib file exported from citavi',
            UploadDialog: {
                Title: 'Upload entries',
                EntriesToUpload: 'Following entries will be uploaded:',
                UnknownEntries: 'Following entries/categories could not be assigned:',
                Override: 'Override existing entries',
                Success: 'Entries successfully uploaded'
            },
            EntriesTable: {
                Key: 'Key',
                Category: 'Category',
                Entry: 'Entry bibliography',
                CiteCount: 'Number of cites'
            },
            Types: 'Categories for entries',
            TypesTable: {
                Name: 'Category',
                EntryExample: 'Example bibliogrpahy',
                CitaviType: 'citavi-type'
            }
        },
        CategoryEditor: {
            Title: 'Edit Category',
            Properties: 'Properties',
            InitialName: 'Name',
            Name: 'New Name',
            CitaviCategory: 'Citavi Category',
            CitaviNecessaryFields: 'Citavi mandatory fields',
            BibliographyEntry: 'Entry in bibliography',
            Cite: 'Cite',
            Attribute: 'Attribute',
            Style: 'Style',
            Prefix: 'Prefix',
            Suffix: 'Suffix',
            TeX_Value: 'Prevent escaping',
            Normal: 'normal',
            Italic: 'italic',
            Success: 'Category successfully saved',
            DeleteCategoryDialog: {
                Title: 'Delete bibliogrpahy category',
                Content: 'Do you really want to delete this category? If entries with this category still exist, they will be displayed incorrectly.',
                Success: 'Category successfully deleted'
            },
            Rules: {
                NoSpaces: 'No spaces permitted',
                NameNotAvailable: 'This name is already used',
                AttributeNotAvailable: 'Attribute already exists'
            }
        },
        EntryEditor: {
            Fields: 'Fields',
            NewKey: 'New key',
            Rules:  {
                KeyNotAvailable: 'Key is not available'
            },
            Success: 'Entry successfully saved',
            DeleteEntryDialog: {
                Title: 'Delete bibliography entry',
                Content: 'If your document still contains cites of this entry, these will be highlighted in red after the next compiling.',
                Success: 'Entry successfully deleted'
            },
        }
    },
    Config: {
        Title: 'Global Configuration',
        DarkMode: 'Use darkmode',
        AutoOpen: 'Open browser when starting the application',
        Success: 'Configuration successfully saved'
    }
}