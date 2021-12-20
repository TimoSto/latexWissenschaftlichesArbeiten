package domain

import (
	"encoding/json"
	"io/ioutil"
	"strings"
)

type LiteratureTypes struct {
	Types []LiteratureType
}

type LiteratureType struct {
	Name string
	HasCitePage bool
	Fields []Field
	CiteFields []Field
	Example string
}

type Field struct {
	Field string
	Style string
	Prefix string
	Suffix string
}

func ReadTypes() (LiteratureTypes, error){
	file, err := ioutil.ReadFile("./literature_types.json")
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

	return literatureTypes, nil
}

func GetType(lType string) (LiteratureType, error) {
	allTypes, err := ReadTypes()
	if err != nil {
		return LiteratureType{}, err
	}
	for _,t := range allTypes.Types {
		if strings.Compare(t.Name, lType) == 0 {
			return t, nil
		}
	}

	return LiteratureType{}, nil
}