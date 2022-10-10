package bib_types

import "testing"

func TestGenerateIfsForBib(t *testing.T) {
	types := []LiteratureType{
		{
			Name: "test",
			Fields: []Field{
				{
					Field:            "test",
					Style:            "italic",
					Prefix:           "",
					Suffix:           ", ",
					TexValue:         false,
					CitaviAttributes: nil,
				},
				{
					Field:            "test2",
					Style:            "normal",
					Prefix:           "",
					Suffix:           ".",
					TexValue:         false,
					CitaviAttributes: nil,
				},
			},
		},
	}

	ifs := GenerateIfsForBibCommands(types)

	if ifs != "\t\t\t{test}{\\printtest{#2}{#3}}%\n" {
		t.Errorf("expected \t\t\t{test}{printtest{#2}{#3}} not %v", ifs)
	}
}
