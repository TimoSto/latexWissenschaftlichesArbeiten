package handlers

import (
	"ThesorTeX/internal/bibliography_types"
	"ThesorTeX/pkg/logger"
	"encoding/json"
	"io/ioutil"
	"net/http"
)

type CategorySaveObj struct {
	Project     string
	InitialName string
	Type        bibliography_types.BibliographyType
}

func HandleSaveType(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		logger.LogError("Saving type", "wrong method")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var data CategorySaveObj
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&data)
	if err != nil {
		logger.LogError("decodig obj to save as type", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = bibliography_types.ReplaceBibliographyType(data.Project, data.InitialName, data.Type, ioutil.ReadFile)

	if err != nil {
		logger.LogError("saving types in json", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = bibliography_types.SaveTypeToLaTeX(data.Project)

}
