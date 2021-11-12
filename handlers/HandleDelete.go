package handlers

import (
	"WA_LaTeX/domain"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

type DeleteObj struct {
	Type string
	Entry int
}

func HandleDeleteType(w http.ResponseWriter, r *http.Request) {
	var delObj DeleteObj
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&delObj)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}

	types, err := domain.ReadTypes()
	for i:=0 ; i<len(types.Types);i++ {
		if strings.Compare(types.Types[i].Name, delObj.Type) == 0 {
			types.Types = append(types.Types[:i], types.Types[i+1:]...)
			break
		}
	}

	jsonStr,err := json.MarshalIndent(types, "", "\t")
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
}

func HandleDeleteEntry(w http.ResponseWriter, r *http.Request) {
	var delObj DeleteObj
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&delObj)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}

	entries := domain.ReadBibEntries()
	entries = append(entries[:delObj.Entry], entries[delObj.Entry+1:]...)

	jsonStr,err := json.MarshalIndent(entries, "", "\t")
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}

	str := string(jsonStr)
	strings.Replace(str, "[", "[\n", -1)

	err = ioutil.WriteFile("./literatur.json", []byte(str), 0644)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}
}