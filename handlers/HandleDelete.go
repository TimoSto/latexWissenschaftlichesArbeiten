package handlers

import (
	"WA_LaTeX/domain"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
)

type DeleteObj struct {
	Type string
	Entry string
	Project string
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
	err = domain.SaveTypesToLaTeX(types.Types)
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

	entries := domain.ReadBibEntries(delObj.Project)
	for i:=0 ; i<len(entries);i++ {
		if strings.Compare(entries[i].Key, delObj.Entry) == 0 {
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

	err = ioutil.WriteFile("./projects/" + delObj.Project + "/literatur.json", []byte(str), 0644)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}

	domain.ConvertBibToCSV(delObj.Project)
}

func HandleDeleteProject(w http.ResponseWriter, r *http.Request) {

	var delObj ProjectName
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&delObj)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(delObj.Name)

	if len(delObj.Name) > 0 && strings.Compare(delObj.Name, "example") != 0 {
		err := os.RemoveAll("./projects/"+delObj.Name)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}
	}
}