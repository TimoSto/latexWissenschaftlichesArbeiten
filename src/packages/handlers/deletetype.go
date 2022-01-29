package handlers

import (
	"WA_LaTeX/src/packages/domain"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

func HandleDeleteType(w http.ResponseWriter,r *http.Request) {
	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	typekeys, ok := r.URL.Query()["type"]

	if !ok || len(typekeys[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	literatureTypes, err := domain.ReadTypes(project)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}
	for i,typ := range literatureTypes.Types {
		if typ.Name == typekeys[0] {
			literatureTypes.Types = append(literatureTypes.Types[:i], literatureTypes.Types[i+1:]...)
			break
		}
	}

	jsonStr,err := json.MarshalIndent(literatureTypes, "", "\t")
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}

	str := string(jsonStr)
	strings.Replace(str, "[", "[\n", -1)

	err = ioutil.WriteFile("./projects/"+project+"/literature_types.json", []byte(str), 0644)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}
	err = domain.SaveTypesToLaTeX(project, literatureTypes.Types)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}
}