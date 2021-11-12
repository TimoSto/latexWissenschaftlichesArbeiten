package handlers

import (
	"WA_LaTeX/domain"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

func HandleSave(w http.ResponseWriter, r *http.Request) {
	var bibType domain.LiteratureType
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&bibType)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}
	fmt.Println(bibType)
	literatureTypes, err := domain.ReadTypes()
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}
	found := false
	for i,typ := range literatureTypes.Types {
		if strings.Compare(typ.Name, bibType.Name) == 0 {
			literatureTypes.Types[i] = bibType
			found = true
			break
		}
	}
	if !found {
		literatureTypes.Types = append(literatureTypes.Types, bibType)
	}

	jsonStr,err := json.MarshalIndent(literatureTypes, "", "\t")
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}

	str := string(jsonStr)
	strings.Replace(str, "[", "[\n", -1)

	err = ioutil.WriteFile("./literature_types.json", []byte(str), 0644)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}

	err = domain.SaveTypesToLaTeX(literatureTypes.Types)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}
}

type ValuePair struct {
	Value string
	Attr string
}

type SaveEntryObj struct {
	InitialKey string
	ValuePairs []ValuePair
	Typ string
}

func HandleSaveEntry(w http.ResponseWriter, r *http.Request) {
	var saveObj SaveEntryObj
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&saveObj)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}
	entry := domain.BibEntry{
		Key:             saveObj.ValuePairs[0].Value,
		Typ:             saveObj.Typ,
		Autor:           saveObj.ValuePairs[1].Value,
		Titel:           saveObj.ValuePairs[2].Value,
		Auflage:         saveObj.ValuePairs[3].Value,
		Ort:             saveObj.ValuePairs[4].Value,
		Datum:           saveObj.ValuePairs[5].Value,
		Hrsg:            saveObj.ValuePairs[6].Value,
		Band:            saveObj.ValuePairs[7].Value,
		Zeitschrift:     saveObj.ValuePairs[8].Value,
		Seiten:          saveObj.ValuePairs[9].Value,
		URL:             saveObj.ValuePairs[10].Value,
		Stand:           saveObj.ValuePairs[11].Value,
	}
	entries := domain.ReadBibEntries()
	if len(saveObj.InitialKey)  == 0 {
		entries = append(entries, entry)
	} else {
		for i:= 0 ; i<len(entries) ; i++ {
			if strings.Compare(entries[i].Key, saveObj.InitialKey) == 0 {
				entries[i] =  entry
				break
			}
		}
	}

	jsonStr, err := json.MarshalIndent(entries, "", "\t")
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}
	err = ioutil.WriteFile("./literatur.json", jsonStr, 0644)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}
}