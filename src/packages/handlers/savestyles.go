package handlers

import (
	"WA_LaTeX/src/packages/domain"
	"encoding/json"
	"fmt"
	"net/http"
)



func HandleSaveStyles(w http.ResponseWriter, r *http.Request) {
	var saveObj domain.PackageStyles
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&saveObj)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 400)
		return
	}

	err = domain.SaveStyles(saveObj.Project, saveObj.Packages)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
		return
	}
}