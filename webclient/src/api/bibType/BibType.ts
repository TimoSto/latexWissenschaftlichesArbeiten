
export type BibType = {
    Name: string
    Fields: Field[]
    CiteFields: Field[]
    Model: string
    CiteModel: string
    CitaviType: string
    CitaviNecessaryFields: string[]
}

export type Field = {
    Field: string
    Style: string
    Prefix: string
    Suffix: string
    TexValue: boolean
    CitaviAttributes: string[]
}

export function CreateField(f: string, s: string, p:string, suf:string): Field {
    return {
        Field: f,
        Style: s,
        Prefix: p,
        Suffix: suf,
        TexValue: false,
        CitaviAttributes: []
    }
}

export type BibTypeSaveObj = {
    Type: BibType,
    Project: string,
    InitialName: string
}
