
export type BibType = {
    Name: string
    HasCitePage: boolean
    Fields: Field[]
    CiteFields: Field[]
    Model: string
    CiteModel: string
}

export type Field = {
    Field: string
    Style: string
    Prefix: string
    Suffix: string
    TexParsed: boolean
}