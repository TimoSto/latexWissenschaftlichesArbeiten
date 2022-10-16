
export type TranslationKeys = {
    Common: {
        Discard: string
        Save: string
    },
    App: {
        TitleAppendixProjects: string
        Information: string
        Homepage: string
    },
    Home: {
        Welcome: string
        Description: string
        TemplateCard: {
            Title: string
            Content: string
        },
        BibCard: {
            Title: string
            Content: string
        },
        CVCard: {
            Title: string
            Content: string
        },
        ContactCard: {
            Title: string
            Content: string
        },
        ConfigCard: {
            Title: string
            Content: string
        }
    },
    Projects: {
        Info: {
            Description: string
        },
        New: {
            AlreadyExists: string
            NoSpaces: string
        }
    },
    Config: {
        Title: string
        DarkMode: string
        AutoOpen: string
    }
}

export const i18nDictionary: TranslationKeys = {
    Common: {
        Discard: 'Common.Discard',
        Save: 'Common.Save'
    },
    App: {
        TitleAppendixProjects: 'App.TitleAppendixProjects',
        Information: 'App.Information',
        Homepage: 'App.Homepage'
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
            AlreadyExists: 'Projects.New.AlreadyExists',
            NoSpaces: 'Projects.New.NoSpaces'
        }
    },
    Config: {
        Title: 'Config.Title',
        DarkMode: 'Config.DarkMode',
        AutoOpen: 'Config.AutoOpen'
    }
}