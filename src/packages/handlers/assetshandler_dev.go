//+build dev

package handlers

import "net/http"

func HandleAssets(w http.ResponseWriter, r *http.Request) {
	http.FileServer(http.Dir("./out")).ServeHTTP(w, r)
}