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

func TestGeneratePrintBibCommands(t *testing.T) {
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

	commands := GeneratePrintBibCommands(types)

	expected := "\\newcommand{\\printtest}[2]{\n\t\\hangindent=\\bibparindent\n\t\\parindent 0pt\n\t\\hangafter=1\n\t\\textit{#1}, #2.\n\t\\\\\n\t\\vspace{-12pt}\n\n}\n"

	if commands != expected {
		t.Errorf("exxpected %s got %s", expected, commands)
	}

}
