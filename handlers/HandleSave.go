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