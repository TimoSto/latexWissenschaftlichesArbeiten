package handlers

import (
	"WA_LaTeX/src/packages/domain"
	"encoding/json"
	"fmt"
	"net/http"
)

type ValuePair struct {
	Value string
	Attr string
}

type SaveEntryObj struct {
	InitialKey string
	ValuePairs []ValuePair
	Typ string
	Key string
	Project string
}

func HandleSaveEntry(w http.ResponseWriter, r *http.Request) {
	var saveObj SaveEntryObj
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&saveObj)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
		return
	}
	entry := domain.BibEntry{
		Key:             saveObj.Key,
		Typ:             saveObj.Typ,
		Fields: []string{},
	}

	for i:=0 ; i<len(saveObj.ValuePairs) ; i++ {
		entry.Fields = append(entry.Fields, saveObj.ValuePairs[i].Value)
	}

	err = domain.SaveEntry(entry, saveObj.Project, saveObj.InitialKey)
}