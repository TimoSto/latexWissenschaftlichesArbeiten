package mockFileSystem

import (
	_ "embed"
	"strings"
)

//go:embed abk_filled.csv
var abkFilled string

func ReadFile(name string) ([]byte, error) {
	name = strings.TrimLeft(name, "./")
	parts := strings.Split(name, "/")
	if parts[2] == "abkuerzungen.csv" {
		if parts[1] == "project_with_abks" {
			return []byte(abkFilled), nil
		}
	}

	return nil, nil
}
