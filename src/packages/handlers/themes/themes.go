package themes

import (
	_ "embed"
	"net/http"
)

//go:embed theme_light.scss
var Light string

//go:embed theme_dark.scss
var Dark string

func HandleTheme(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["theme"]

	if !ok || len(keys[0]) < 1 || keys[0] != "dark" {
		w.Write([]byte(Light))
		return
	}

	w.Write([]byte(Dark))
}
