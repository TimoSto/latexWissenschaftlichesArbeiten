package projects

import (
	"WA_LaTeX/internal/pathbuilder"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

func CiteCleanup(project string) error {
	texFile, err := ioutil.ReadFile(pathbuilder.GetPathInProject(project, project+".tex"))
	if err != nil {
		return err
	}

	reg := regexp.MustCompile(`citebib{(.*?)}{(.*?)}{(.*?)}`)
	matches := reg.FindAllString(string(texFile), -1)
	var citedEntries []string
	filecontent := "ckey;\n"
	for _, match := range matches {
		match = strings.Split(match, "citebib{")[1]
		match = strings.Split(match, "}")[0]
		if SliceIndex(len(citedEntries), func(i int) bool { return strings.Compare(citedEntries[i], match) == 0 }) == -1 {
			citedEntries = append(citedEntries, match)
			filecontent += fmt.Sprintf("%s;\n", match)
		}
	}

	filepath.Walk(pathbuilder.GetProjectPath(project), func(path string, info os.FileInfo, err error) error {
		if err != nil {
			log.Fatalf(err.Error())
		}
		if strings.Compare(filepath.Ext(info.Name()), ".tex") == 0 {

			texFile, err := ioutil.ReadFile(path)
			if err != nil {
				return err
			}

			reg = regexp.MustCompile(`citebib{(.*?)}{(.*?)}{(.*?)}`)
			matches = reg.FindAllString(string(texFile), -1)
			for _, match := range matches {
				match = strings.Split(match, "citebib{")[1]
				match = strings.Split(match, "}")[0]
				if SliceIndex(len(citedEntries), func(i int) bool { return strings.Compare(citedEntries[i], match) == 0 }) == -1 {
					citedEntries = append(citedEntries, match)
					filecontent += fmt.Sprintf("%s;\n", match)
				}
			}
			err = ioutil.WriteFile(fmt.Sprintf(pathbuilder.GetPathInProject(project, "citedKeys.csv"), project), []byte(filecontent), 0644)
			if err != nil {
				return err
			}

		}
		return nil
	})
	// fmt.Println(filecontent)
	err = ioutil.WriteFile(pathbuilder.GetPathInProject(project, "citedKeys.csv"), []byte(filecontent), 0644)
	return err
}

func SliceIndex(limit int, predicate func(i int) bool) int {
	for i := 0; i < limit; i++ {
		if predicate(i) {
			return i
		}
	}
	return -1
}
