package mockFileSystem

import (
	"fmt"
	"io/fs"
	"io/ioutil"
	"strings"
)

func ReadFile(name string) ([]byte, error) {

	parts := strings.Split(name, "/")

	path := strings.Join(parts[2:], "/")

	return ioutil.ReadFile(fmt.Sprintf("./mockLiterature/%s", path))
}

func WriteFile(name string, content []byte, perm fs.FileMode) error {

	parts := strings.Split(name, "/")

	path := strings.Join(parts[2:], "/")

	return ioutil.WriteFile(fmt.Sprintf("./mockLiterature/%s", path), content, perm)
}

func ClearLiterature(name string) error {
	return ioutil.WriteFile("./mockLiterature/"+name+"/literatur.json", []byte("[]"), 0644)
}
