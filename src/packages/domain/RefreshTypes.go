package domain

import (
	"WA_LaTeX/src/tools/logger"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strings"
)

func RefreshTypes(project string) error{

	//TODO: Refreshing sty-PAckages

	types, err := ReadTypes(project)
	if err != nil {
		return err
	}

	defaultTypesFile := literaturTypesTemplate
	var literatureTypes LiteratureTypes

	err = json.Unmarshal([]byte(defaultTypesFile), &literatureTypes)
	if err != nil {
		return err
	}

	for _, defaultTyp := range literatureTypes.Types {
		found := false
		for i,typ := range types.Types {
			if typ.Name == defaultTyp.Name {
				found = true
				logger.LogInfo("Refreshing type " + typ.Name)
				types.Types[i] = defaultTyp
			}
		}
		if !found {
			logger.LogInfo("Added type "+ defaultTyp.Name)
			types.Types = append(types.Types, defaultTyp)
		}
	}

	jsonStr,err := json.MarshalIndent(types, "", "\t")
	if err != nil {
		return err
	}

	str := string(jsonStr)
	strings.Replace(str, "[", "[\n", -1)

	err = ioutil.WriteFile("./projects/"+project+"/literature_types.json", []byte(str), 0644)
	if err != nil {
		logger.LogError("Writing types to file "+"./projects/"+project+"/literature_types.json", err.Error())
		return err
	}

	err = SaveTypesToLaTeX(project, types.Types)
	if err != nil {
		logger.LogError("Saving types to literatur.tex", err.Error())
		return err
	}
	logger.LogInfo(fmt.Sprintf("Successfully refreshed types for project %s", project))

	return nil
}