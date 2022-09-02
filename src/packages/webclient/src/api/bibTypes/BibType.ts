
export type BibType = {
    Name: string
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
    TexValue: boolean
}