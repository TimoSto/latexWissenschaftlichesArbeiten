package handlers

import (
	"encoding/json"
	"fmt"
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
	
	err = os.Rename("./projects/"+saveObj.InitialName, "./projects/" + saveObj.Name)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}

	//TODO: rename files?
}