package bibliography_types

import (
	"ThesorTeX/internal/pathbuilder"
	"encoding/json"
)

type BibliographyTypes struct {
	Types []BibliographyType
}

func ReadTypes(project string, readFile func(string) ([]byte, error)) ([]BibliographyType, error) {
	file, err := readFile(pathbuilder.GetPathInProject(project, "bibliography_types.json"))
	if err != nil {
		return []BibliographyType{}, err
	}
	var literatureTypes BibliographyTypes

	err = json.Unmarshal(file, &literatureTypes)
	if err != nil {
		return []BibliographyType{}, err
	}

	return literatureTypes.Types, nil
}

//TODO: tests
