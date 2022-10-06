package handlers

import (
	"WA_LaTeX/pkg/logger"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	. "WA_LaTeX/internal/abbreviations"
	. "WA_LaTeX/internal/bib_entries"
	. "WA_LaTeX/internal/bib_types"
)

type ProjectData struct {
	BibTypes      []LiteratureType
	BibEntries    []BibEntry
	Abbreviations []Abbreviation
}

func GetProjectData(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	literatureTypes, err := ReadTypes(project)
	if err != nil {
		logger.LogError("Error reading bibEntries for "+project, err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	entries, err := ReadBibEntries(project, ioutil.ReadFile)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), 500)
		return
	}

	abbrs, err := GetAbbreviations(project)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), 500)
		return
	}

	data := ProjectData{
		BibTypes:      literatureTypes.Types,
		BibEntries:    entries,
		Abbreviations: abbrs,
	}

	jsonData, err := json.Marshal(&data)
	if err != nil {
		logger.LogError("Error marshaling data for "+project, err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(jsonData)
}
