package handlers

import (
	_ "embed"
	"fmt"
	"net/http"
)

//go:generate xcopy /S /Q /Y /F ..\..\..\projects\documentation\documentation.pdf .\documentation\

//go:embed documentation/documentation.pdf
var documentationFile string

func HandleDocumentation(w http.ResponseWriter, r *http.Request) {
	_, err := w.Write([]byte(documentationFile))
	if err != nil {
		fmt.Println(err)
	}
}
