package handlers

import (
	"net/http"

	. "WA_LaTeX/webclient/assets"
)

func HandleAssetsNew(w http.ResponseWriter, r *http.Request) {
	http.FileServer(http.FS(SubDir)).ServeHTTP(w, r)
}
