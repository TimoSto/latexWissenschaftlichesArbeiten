package projects

import (
	"WA_LaTeX/internal/pathbuilder"
	"io/ioutil"
	"os"
)

func GetProjects() ([]string, error) {
	projectsPath := pathbuilder.GetPathFromExecRoot("projects")
	dirContent, err := ioutil.ReadDir(projectsPath)
	if err != nil {
		err = os.Mkdir(projectsPath, 0644)
		if err != nil {
			return nil, err
		}
		dirContent, err = ioutil.ReadDir(projectsPath)
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
