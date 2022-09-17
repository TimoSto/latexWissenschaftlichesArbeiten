package handlers

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	. "WA_LaTeX/internal/bib_entries"
)

func GetBibEntriesHandler(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'project' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	entries, err := ReadBibEntries(project, ioutil.ReadFile)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), 500)
		return
	}

	jsonObj, err := json.Marshal(entries)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), 500)
		return
	}

	w.Write(jsonObj)
}
