package handlers

import (
	"WA_LaTeX/src/packages/domain"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

type SaveTypeObj struct {
	Type domain.LiteratureType
	InitialName string
	Project string
}

func HandleSaveType(w http.ResponseWriter, r *http.Request) {




	var saveObj SaveTypeObj
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&saveObj)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}
	fmt.Println(saveObj)
	initialName := r.URL.Query().Get("initialName")
	fmt.Println(initialName)
	literatureTypes, err := domain.ReadTypes(saveObj.Project)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}
	found := false
	for i,typ := range literatureTypes.Types {
		if strings.Compare(typ.Name, saveObj.Type.Name) == 0 || strings.Compare(typ.Name, initialName) == 0{
			literatureTypes.Types[i] = saveObj.Type
			found = true
			break
		}
	}
	if !found {
		literatureTypes.Types = append(literatureTypes.Types, saveObj.Type)
	}

	jsonStr,err := json.MarshalIndent(literatureTypes, "", "\t")
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}

	str := string(jsonStr)
	strings.Replace(str, "[", "[\n", -1)

	err = ioutil.WriteFile("./projects/"+saveObj.Project+"/literature_types.json", []byte(str), 0644)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}

	err = domain.SaveTypesToLaTeX(saveObj.Project, literatureTypes.Types)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}
}