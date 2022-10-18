package bibliography_types

type BibliographyType struct {
	Name                  string
	CitaviType            string
	CitaviNecessaryFields []string //z.B. nur dieser Typ wenn doi existiert
	Fields                []Field
	CiteFields            []Field
}

type Field struct {
	Field            string
	Style            string
	Prefix           string
	Suffix           string
	TexValue         bool
	CitaviAttributes []string
}
