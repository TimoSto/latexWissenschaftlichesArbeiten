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
		_, err := w.Write([]byte(cv.GetTemplate(keys[0])))
		if err != nil {
			fmt.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
		}
	}
}
