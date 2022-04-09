package handlers

import (
	_ "embed"
	"fmt"
	"net/http"
)

//go:embed CV/curriculumVitae.pdf
var cvPDF string

//go:embed CV/curriculumVitae.tex
var cvTex string


func HandleCV(w http.ResponseWriter,r *http.Request) {
	keys, ok := r.URL.Query()["type"]
	
	if ok && len(keys[0]) > 0 {
		if keys[0] == "pdf" {
			_,err := w.Write([]byte(cvPDF))
			if err != nil {
				fmt.Println(err)
			}
		} else {
			_,err := w.Write([]byte(cvTex))
			if err != nil {
				fmt.Println(err)
			}
		}
	}
}