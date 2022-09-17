package handlers

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func GetPDF(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	file, err := ioutil.ReadFile("./projects/" + project + "/" + project + ".pdf")
	if err != nil {
		fmt.Println(err)
	}

	_, err = w.Write([]byte(file))
	if err != nil {
		fmt.Println(err)
	}
}
