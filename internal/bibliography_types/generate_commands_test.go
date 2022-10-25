package bibliography_types

import "testing"

func TestGenerateIfsForCite_Footnote(t *testing.T) {
	btype := BibliographyType{
		Name:                  "test",
		CitaviType:            "",
		CitaviNecessaryFields: nil,
		Fields:                nil,
		CiteFields: []Field{
			{
				Field:  "f1",
				Style:  "normal",
				Prefix: "",
				Suffix: ", ",
			},
			{
				Field:  "f2",
				Style:  "italic",
				Prefix: "(",
				Suffix: "), ",
			},
		},
	}

	ifCmd := GenerateIfForCite(btype, true)

	if ifCmd != "\t\t\t{test}{\\footnote{#3\\citetest{\\a}{\\b}{#2}}}%\n" {
		t.Errorf("expected not %v", ifCmd)
	}
}

func TestGenerateIfsForCite_Inline(t *testing.T) {
	btype := BibliographyType{
		Name:                  "test",
		CitaviType:            "",
		CitaviNecessaryFields: nil,
		Fields:                nil,
		CiteFields: []Field{
			{
				Field:  "f1",
				Style:  "normal",
				Prefix: "",
				Suffix: ", ",
			},
			{
				Field:  "f2",
				Style:  "italic",
				Prefix: "(",
				Suffix: "), ",
			},
		},
	}

	ifCmd := GenerateIfForCite(btype, false)

	if ifCmd != "\t\t\t{test}{({#3\\citetest{\\a}{\\b}{#2})}}%\n" {
		t.Errorf("expected not %v", ifCmd)
	}
}
