package mockFileSystem

import (
	_ "embed"
	"fmt"
	"io/fs"
	"strings"
)

//go:embed abk_filled.csv
var abkFilled string

//go:embed abk_empty.csv
var abkEmpty string

func ReadFile(name string) ([]byte, error) {
	name = strings.TrimLeft(name, "./")
	parts := strings.Split(name, "/")
	if parts[2] == "abkuerzungen.csv" {
		if parts[1] == "project_with_abks" {
			return []byte(abkFilled), nil
		}
		if parts[1] == "project_without_abks" {
			return []byte(abkEmpty), nil
		}
	}

	return nil, nil
}

func WriteFile(path string, data []byte, fm fs.FileMode) error {
	path = strings.TrimLeft(path, "./")
	parts := strings.Split(path, "/")
	if parts[2] == "abkuerzungen.csv" {
		if parts[1] == "project_with_abks" {
			abkFilled = string(data)
			return nil
		}
		if parts[1] == "project_without_abks" {
			abkEmpty = string(data)
			return nil
		}
	}
	return fmt.Errorf("file not found")
}
