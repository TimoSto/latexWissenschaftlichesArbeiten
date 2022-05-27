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
	Name        string
	HasCitePage bool
	Fields      []Field
	CiteFields  []Field
	Example     string
}

type Field struct {
	Field  string
	Style  string
	Prefix string
	Suffix string
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

	for i, typ := range literatureTypes.Types {
		str := ""
		for _, field := range typ.Fields {
			str += field.Prefix + field.Field + field.Suffix
		}
		literatureTypes.Types[i].Example = str
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
