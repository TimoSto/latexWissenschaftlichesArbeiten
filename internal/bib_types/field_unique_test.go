package bib_types

import "testing"

func TestLiteratureType_FieldUniqueInCite(t *testing.T) {
	ty := LiteratureType{
		Name:                  "test",
		CitaviType:            "",
		CitaviNecessaryFields: nil,
		Fields: []Field{
			{
				Field:            "a",
				Style:            "normal",
				Prefix:           "",
				Suffix:           "",
				TexValue:         false,
				CitaviAttributes: nil,
			},
			{
				Field:            "b",
				Style:            "normal",
				Prefix:           "",
				Suffix:           "",
				TexValue:         false,
				CitaviAttributes: nil,
			},
		},
		CiteFields: []Field{
			{
				Field:            "a",
				Style:            "normal",
				Prefix:           "",
				Suffix:           "",
				TexValue:         false,
				CitaviAttributes: nil,
			},
			{
				Field:            "c",
				Style:            "normal",
				Prefix:           "",
				Suffix:           "",
				TexValue:         false,
				CitaviAttributes: nil,
			},
		},
	}

	if ty.FieldUniqueInCite("a") {
		t.Errorf("Field a is not unique in cite")
	}

	if ty.FieldUniqueInCite("b") {
		t.Errorf("Field b does not exist in cite")
	}

	if !ty.FieldUniqueInCite("c") {
		t.Errorf("Field c is unique in cite")
	}
}
