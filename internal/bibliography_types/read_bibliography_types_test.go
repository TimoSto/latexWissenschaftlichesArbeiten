package bibliography_types

import (
	"ThesorTeX/mock/mockFileSystem"
	"reflect"
	"testing"
)

func TestReadBibliographyTypes_withTemplate(t *testing.T) {
	types, err := ReadTypes("template", mockFileSystem.ReadFile)
	if err != nil {
		t.Errorf("unexpected err %v", err.Error())
		return
	}

	if len(types) != 18 {
		t.Errorf("expected 18 types, got %v", len(types))
	}

	et := BibliographyType{
		Name:                  "citaviProceedingsDoi",
		CitaviType:            "proceedings",
		CitaviNecessaryFields: []string{"doi"},
		Fields: []Field{
			{
				Field:            "Herausgeber",
				Style:            "italic",
				Prefix:           "",
				Suffix:           "  ",
				TexValue:         false,
				CitaviAttributes: []string{"author"},
			},
			{
				Field:            "Jahr",
				Style:            "normal",
				Prefix:           "(",
				Suffix:           "). ",
				TexValue:         false,
				CitaviAttributes: []string{"year"},
			},
			{
				Field:            "Titel",
				Style:            "normal",
				Prefix:           "",
				Suffix:           ", ",
				TexValue:         false,
				CitaviAttributes: []string{"title"},
			},
			{
				Field:            "Doi",
				Style:            "normal",
				Prefix:           "https://doi.org/",
				Suffix:           "",
				TexValue:         false,
				CitaviAttributes: []string{"doi"},
			},
		},
		CiteFields: []Field{
			{
				Field:            "Hrsg_kurz",
				Style:            "italic",
				Prefix:           "",
				Suffix:           " ",
				TexValue:         false,
				CitaviAttributes: []string{},
			},
			{
				Field:            "Jahr",
				Style:            "normal",
				Prefix:           "(",
				Suffix:           "), ",
				TexValue:         false,
				CitaviAttributes: []string{},
			},
		},
	}

	if !reflect.DeepEqual(et, types[13]) {
		t.Errorf("expected %v to equal %v", types, et)
	}
}
