
export type TranslationKeys = {
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
    }
}

export const i18nDictionary: TranslationKeys = {
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
        }
    }
}