package handlers

import (
	"WA_LaTeX/src/packages/domain"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

func HandleDeleteEntry(w http.ResponseWriter, r *http.Request) {

	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	entrykeys, ok := r.URL.Query()["entry"]

	if !ok || len(entrykeys[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	entry := entrykeys[0]

	entries, err := domain.ReadBibEntries(project)
	for i:=0 ; i<len(entries);i++ {
		if entries[i].Key == entry {
			entries = append(entries[:i], entries[i+1:]...)
			break
		}
	}

	jsonStr,err := json.MarshalIndent(entries, "", "\t")
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}

	str := string(jsonStr)
	strings.Replace(str, "[", "[\n", -1)

	err = ioutil.WriteFile("./projects/" + project + "/literatur.json", []byte(str), 0644)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}

	domain.ConvertBibToCSV(project)
}