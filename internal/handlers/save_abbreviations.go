package handlers

import (
	. "WA_LaTeX/internal/abbreviations"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type AbbrSaveObj struct {
	Abbreviations []Abbreviation
	Project       string
}

func HandleSaveAbbreviations(w http.ResponseWriter, r *http.Request) {
	var saveObj AbbrSaveObj
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&saveObj)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
		return
	}

	err = WriteAbbreviations(saveObj.Abbreviations, saveObj.Project, ioutil.WriteFile)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
		return
	}
}
