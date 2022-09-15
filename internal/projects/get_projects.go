package projects

import (
	"io/ioutil"
	"os"
)

func GetProjects() ([]string, error) {
	dirContent, err := ioutil.ReadDir("./projects/")
	if err != nil {
		err = os.Mkdir("./projects", 0644)
		if err != nil {
			return nil, err
		}
		dirContent, err = ioutil.ReadDir("./projects/")
		if err != nil {
			return nil, err
		}
	}

	var projects []string

	for _, f := range dirContent {
		if f.IsDir() {
			projects = append(projects, f.Name())
		}
	}

	return projects, nil
}
