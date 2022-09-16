package server

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func GetTeX(w http.ResponseWriter, r *http.Request) {

	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	file, err := ioutil.ReadFile(fmt.Sprintf("./projects/%s/%s.tex", project, project))
	if err != nil {
		log.Println(err)
		http.Error(w, "Could not find file", http.StatusBadRequest)
		return
	}

	w.Write(file)

}
