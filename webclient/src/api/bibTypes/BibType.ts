

export interface BibType {
    Name: string
    Fields: Field[]
    CiteFields: Field[]
    Model: string
    CiteModel: string
    CitaviType: string
    CitaviNecessaryFields: string[]
}

export interface Field {
    Field: string
    Style: string
    Prefix: string
    Suffix: string
    TexValue: boolean
    CitaviAttributes: string[]
}