package domain

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"sort"
	"strings"
)

type LiteratureTypes struct {
	Types []LiteratureType
}

type LiteratureType struct {
	Name       string
	Fields     []Field
	CiteFields []Field
}

type Field struct {
	Field    string
	Style    string
	Prefix   string
	Suffix   string
	TexValue bool
}

func ReadTypes(project string) (LiteratureTypes, error) {
	file, err := ioutil.ReadFile(fmt.Sprintf("./projects/%s/literature_types.json", project))
	if err != nil {
		return LiteratureTypes{}, err
	}
	var literatureTypes LiteratureTypes

	err = json.Unmarshal(file, &literatureTypes)
	if err != nil {
		return LiteratureTypes{}, err
	}

	sort.Slice(literatureTypes.Types, func(i, j int) bool {
		return strings.ToUpper(literatureTypes.Types[i].Name) < strings.ToUpper(literatureTypes.Types[j].Name)
	})

	return literatureTypes, nil
}

func GetType(project string, lType string) (LiteratureType, error) {
	allTypes, err := ReadTypes(project)
	if err != nil {
		return LiteratureType{}, err
	}
	for _, t := range allTypes.Types {
		if t.Name == lType {
			return t, nil
		}
	}

	return LiteratureType{}, nil
}

func (t *LiteratureType) FieldUniqueInCite(field string) bool {
	for _, f := range t.Fields {
		if f.Field == field {
			return false
		}
	}
	return true
}

func (t *LiteratureType) IndexOfField(field string) (int, bool) {
	for i, f := range t.Fields {
		if f.Field == field {
			return i, true
		}
	}
	for i, f := range t.CiteFields {
		if f.Field == field {
			return i, false
		}
	}
	return -1, false
}
