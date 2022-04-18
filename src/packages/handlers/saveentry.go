package handlers

import (
	"WA_LaTeX/src/packages/domain"
	"WA_LaTeX/src/tools/logger"
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
		logger.LogError("Decoding HTTP-POST for saveEntry", err.Error())
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

		entry.Fields = append(entry.Fields, saveObj.Entry.ValuePairs[i].Value)
	}

	entries := []domain.BibEntry{
		entry,
	}

	initialKeys := []string{
		saveObj.Entry.InitialKey,
	}

	err, added, changed := domain.SaveEntries(entries, saveObj.Project, initialKeys)
	if err != nil {
		logger.LogError("Saving entries", err.Error())
		if strings.Contains(err.Error(), "already exists") {
			http.Error(w,err.Error(),400)
		} else {
			http.Error(w,err.Error(),500)
		}
		return
	}
	logger.LogInfo(fmt.Sprintf("Successfully saved entry %s", saveObj.Entry.Key))

	obj := struct{Added int; Changed int}{
		Added: added,
		Changed: changed,
	}
	str,_ := json.Marshal(obj)
	w.Write(str)
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

	var entries []domain.BibEntry
	var initialKeys []string
	for i,_ := range saveObj.Entries {
		entry := domain.BibEntry{
			Key:             saveObj.Entries[i].Key,
			Typ:             saveObj.Entries[i].Typ,
			Fields: []string{},
			Comment: saveObj.Entries[i].Comment,
		}

		for n:=0 ; n<len(saveObj.Entries[i].ValuePairs) ; n++ {

			entry.Fields = append(entry.Fields, saveObj.Entries[i].ValuePairs[n].Value)
		}

		entries = append(entries, entry)
		initialKeys = append(initialKeys, "")
	}

	err, added, changed := domain.SaveEntries(entries, saveObj.Project, initialKeys)
	if err != nil {
		fmt.Println(err)
		if strings.Contains(err.Error(), "already exists") {
			http.Error(w,err.Error(),400)
		} else {
			http.Error(w,err.Error(),500)
		}
		return
	}
	fmt.Println(fmt.Sprintf("Successfully added entries %v and changed %v entries", added, changed))
	obj := struct{Added int; Changed int}{
		Added: added,
		Changed: changed,
	}
	str,_ := json.Marshal(obj)
	w.Write(str)
}