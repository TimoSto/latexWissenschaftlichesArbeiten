//go:build dev
// +build dev

package handlers

//import (
//	"fmt"
//	"io/ioutil"
//	"net/http"
//)
//
//func HandleAssets(w http.ResponseWriter, r *http.Request) {
//	http.FileServer(http.Dir("./out")).ServeHTTP(w, r)
//}
//
//func GetHTMLFile(name string) (string, error) {
//	file, err := ioutil.ReadFile(fmt.Sprintf("./out/%s.html", name))
//	return string(file), err
//}
