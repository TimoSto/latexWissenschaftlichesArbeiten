package handlers

import (
	"net/http"

	assets2 "WA_LaTeX/src/packages/webclient/assets"
)

func HandleAssetsNew(w http.ResponseWriter, r *http.Request) {
	http.FileServer(http.FS(assets2.SubDir)).ServeHTTP(w, r)
}
