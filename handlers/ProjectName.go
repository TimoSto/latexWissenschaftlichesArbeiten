package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

type ProjectName struct {
	Name string
	InitialName string
}

func HandleProjectName(w http.ResponseWriter, r *http.Request) {
	var saveObj ProjectName
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&saveObj)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}

	if len(saveObj.InitialName) > 0 {
		err = os.Rename("./projects/"+saveObj.InitialName, "./projects/" + saveObj.Name)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}
	} else {
		err := os.Mkdir("./projects/"+saveObj.Name, 0755)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}

		err = ioutil.WriteFile("./projects/"+saveObj.Name+"/literatur.json", []byte("[]"), 0644)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}
		inputcsv, err := ioutil.ReadFile("literatur_template.csv")
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}
		err = ioutil.WriteFile("./projects/"+saveObj.Name+"/literatur.csv", inputcsv, 0644)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}
		inputtex, err := ioutil.ReadFile("template.tex")
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}
		err = ioutil.WriteFile("./projects/"+saveObj.Name+"/"+saveObj.Name+".tex", inputtex, 0644)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}
		err = ioutil.WriteFile("./projects/"+saveObj.Name+"/abkuerzungen.csv", []byte("abk;bed;"), 0644)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}
		err = ioutil.WriteFile("./projects/"+saveObj.Name+"/citedKeys.csv", []byte("ckey;\n*;"), 0644)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}
	}

	//TODO: rename files?
}