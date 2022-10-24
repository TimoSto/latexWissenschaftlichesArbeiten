package handlers

import (
	"ThesorTeX/webclient/assets"
	"net/http"
)

func HandleRoot(w http.ResponseWriter, r *http.Request) {
	http.FileServer(http.FS(assets.SubDir)).ServeHTTP(w, r)
}
