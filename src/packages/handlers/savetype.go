package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"WA_LaTeX/pkg/logger"
	"WA_LaTeX/src/packages/domain"
)

type SaveTypeObj struct {
	Type        domain.LiteratureType
	InitialName string
	Project     string
}

func HandleSaveType(w http.ResponseWriter, r *http.Request) {

	var saveObj SaveTypeObj
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&saveObj)
	if err != nil {
		logger.LogError("Decoding HTTP-POST for saveType", err.Error())
		http.Error(w, err.Error(), 500)
	}
	logger.LogInfo(fmt.Sprintf("Saving type %s", saveObj.Type.Name))
	fmt.Println(saveObj.Type.CitaviType)
	initialName := saveObj.InitialName
	literatureTypes, err := domain.ReadTypes(saveObj.Project)
	if err != nil {
		logger.LogError("Reading types for project "+saveObj.Project, err.Error())
		http.Error(w, err.Error(), 500)
	}

	if saveObj.Type.Name != saveObj.InitialName {
		//if name is changed make sure it does not already exist
		for _, bType := range literatureTypes.Types {
			if bType.Name == saveObj.Type.Name {
				err = fmt.Errorf("Type with name '%s' already exists. Delete the old one or rename the new one.", saveObj.Type.Name)
				logger.LogError("SAVING TYPE", err.Error())
				http.Error(w, err.Error(), 400)
				return
			}
		}
	}

	found := false
	for i, typ := range literatureTypes.Types {
		if len(initialName) == 0 && strings.Compare(typ.Name, saveObj.Type.Name) == 0 {
			fmt.Println(fmt.Sprintf("Typ mit Namen %s existiert bereits", saveObj.Type.Name))
			http.Error(w, fmt.Sprintf("Typ mit Namen %s existiert bereits", saveObj.Type.Name), http.StatusBadRequest)
			return
		}

		if strings.Compare(typ.Name, saveObj.Type.Name) == 0 || strings.Compare(typ.Name, initialName) == 0 {
			literatureTypes.Types[i] = saveObj.Type
			found = true
			break
		}
	}
	if !found {
		literatureTypes.Types = append(literatureTypes.Types, saveObj.Type)
	}

	jsonStr, err := json.MarshalIndent(literatureTypes, "", "\t")
	if err != nil {
		logger.LogError("JSON-formatting types", err.Error())
		http.Error(w, err.Error(), 500)
	}

	str := string(jsonStr)
	strings.Replace(str, "[", "[\n", -1)

	err = ioutil.WriteFile("./projects/"+saveObj.Project+"/literature_types.json", []byte(str), 0644)
	if err != nil {
		logger.LogError("Writing types to file "+"./projects/"+saveObj.Project+"/literature_types.json", err.Error())
		http.Error(w, err.Error(), 500)
	}

	err = domain.SaveTypesToLaTeX(saveObj.Project, literatureTypes.Types)
	if err != nil {
		logger.LogError("Saving types to literatur.tex", err.Error())
		http.Error(w, err.Error(), 500)
		return
	}
	logger.LogInfo(fmt.Sprintf("Successfully saved type %s", saveObj.Type.Name))
}
