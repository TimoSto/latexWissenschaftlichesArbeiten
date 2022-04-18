//+build !dev

package handlers

import (
	"embed"
	"fmt"
	"io/fs"
	"net/http"
)

//go:generate xcopy ..\..\..\out .\out /E/H/I/C/Y
// content holds our static web server content.
//go:embed out
var assets embed.FS

var fSys, err = fs.Sub(assets, "out")

func HandleAssets(w http.ResponseWriter, r *http.Request) {

	http.FileServer(http.FS(fSys)).ServeHTTP(w, r)
}

func GetHTMLFile(name string) (string, error) {
	file, err := assets.ReadFile(fmt.Sprintf("out/%s.html", name))
	return string(file), err
}