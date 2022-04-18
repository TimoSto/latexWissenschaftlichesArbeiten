package handlers

import (
	"WA_LaTeX/src/packages/domain"
	"WA_LaTeX/src/tools/logger"
	"encoding/json"
	"net/http"
)



func HandleSaveStyles(w http.ResponseWriter, r *http.Request) {
	var saveObj domain.PackageStyles
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&saveObj)
	if err != nil {
		logger.LogError("Decoding HTTP-POST for saveStyles", err.Error())
		http.Error(w, err.Error(), 400)
		return
	}

	err = domain.SaveStyles(saveObj.Project, saveObj.Packages)
	if err != nil {
		logger.LogError("Saving styles for project "+saveObj.Project, err.Error())
		http.Error(w, err.Error(), 500)
		return
	} else {
		logger.LogInfo("Styles für Projekt '" + saveObj.Project +"' erfolgreich gespeichert.")
	}
}