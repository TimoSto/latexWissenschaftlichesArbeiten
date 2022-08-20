
type BibType = {
    Name: string
    HasCitePage: boolean
    Fields: Field
    CiteFields: Field
    Example: string
}

type Field = {
    Field: string
    Style: string
    Prefix: string
    Suffix: string
}