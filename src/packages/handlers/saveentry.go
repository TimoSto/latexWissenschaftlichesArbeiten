package handlers

import (
	"WA_LaTeX/src/packages/domain"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

type ValuePair struct {
	Value string
	Attr string
}

type EntrySave struct {
	InitialKey string
	ValuePairs []ValuePair
	Typ string
	Key string
	Comment string
}

type SaveEntryObj struct {
	Entry EntrySave
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
		Key:             saveObj.Entry.Key,
		Typ:             saveObj.Entry.Typ,
		Fields: []string{},
		Comment: saveObj.Entry.Comment,
	}

	for i:=0 ; i<len(saveObj.Entry.ValuePairs) ; i++ {
		fmt.Println(saveObj.Entry.ValuePairs[i].Value)
		entry.Fields = append(entry.Fields, saveObj.Entry.ValuePairs[i].Value)
	}

	entries := []domain.BibEntry{
		entry,
	}

	initialKeys := []string{
		saveObj.Entry.InitialKey,
	}

	err = domain.SaveEntries(entries, saveObj.Project, initialKeys)
	if err != nil {
		fmt.Println(err)
		if strings.Contains(err.Error(), "already exists") {
			http.Error(w,err.Error(),400)
		} else {
			http.Error(w,err.Error(),500)
		}
		return
	}
	fmt.Println(fmt.Sprintf("Successfully saved entry %s", saveObj.Entry.Key))
}

type UploadEntriesObj struct {
	Entries []EntrySave
	Project string
}

func HandleUploadEntries(w http.ResponseWriter,r *http.Request) {
	var saveObj UploadEntriesObj
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&saveObj)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
		return
	}
}