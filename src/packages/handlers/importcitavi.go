package handlers
//
//import (
//	"WA_LaTeX/src/packages/domain"
//	"encoding/json"
//	"fmt"
//	"net/http"
//)
//
//type CitaviFile struct {
//	File string
//	Project string
//}
//
//func HandleImportCitavi(w http.ResponseWriter, r *http.Request) {
//	var saveObj CitaviFile
//	decoder := json.NewDecoder(r.Body)
//	err := decoder.Decode(&saveObj)
//	if err != nil {
//		fmt.Println(err)
//		http.Error(w, err.Error(), 500)
//		return
//	}
//
//	entry, err := domain.CitaviToJSON(saveObj.File)
//	if err != nil {
//		fmt.Println(err)
//		http.Error(w, err.Error(), 500)
//		return
//	}
//
//	err = domain.SaveEntry(entry, saveObj.Project, "")
//	if err != nil {
//		fmt.Println(err)
//		http.Error(w, err.Error(), 500)
//		return
//	}
//}