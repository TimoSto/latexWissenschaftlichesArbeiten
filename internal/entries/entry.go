package entries

type BibEntry struct {
	Key        string
	Typ        string
	Fields     []string
	Comment    string
	CiteNumber int
}
