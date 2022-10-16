import {TranslationKeys} from "@/i18n/Keys";

export const EnglishTranslations: TranslationKeys = {
    Common: {
        Discard: 'Discard',
        Save: 'Save'
    },
    App: {
        TitleAppendixProjects: 'Projects',
        Information: 'Information',
        Homepage: 'Homepage'
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
            NoSpaces: 'No Spaces in project name allowed'
        }
    },
    Config: {
        Title: 'Global Configuration',
        DarkMode: 'Use darkmode',
        AutoOpen: 'Open browser when starting the application'
    }
}