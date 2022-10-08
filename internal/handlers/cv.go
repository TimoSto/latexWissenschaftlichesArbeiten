package handlers

import (
	"WA_LaTeX/internal/cv"
	_ "embed"
	"fmt"
	"net/http"
)

func HandleCVTemplate(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["type"]

	if ok && len(keys[0]) > 0 {
		var err error
		if keys[0] == "pdf" {
			_, err = w.Write([]byte(cv.CV_Zip))
		} else {
			_, err = w.Write([]byte(cv.CV_PDF))
		}
		if err != nil {
			fmt.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
		}
	}
}
