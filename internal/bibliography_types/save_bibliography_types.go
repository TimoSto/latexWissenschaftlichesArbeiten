package bibliography_types

import (
	"ThesorTeX/internal/pathbuilder"
	"encoding/json"
	"io/ioutil"
)

func SaveBibliographyTypes(project string, types []BibliographyType) error {
	data, err := json.Marshal(BibliographyTypes{Types: types})
	if err != nil {
		return err
	}

	//TODO: writeFile as param
	return ioutil.WriteFile(pathbuilder.GetPathInProject(project, "literature_types.json"), data, 0777)
}
