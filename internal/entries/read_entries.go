package entries

import (
	"ThesorTeX/internal/pathbuilder"
	"encoding/json"
	"fmt"
	"io/ioutil"
)

func ReadBibEntries(project string, readFile func(string) ([]byte, error)) ([]BibEntry, error) {
	if len(project) == 0 {
		return nil, fmt.Errorf("No Project Name provided")
	}
	file, err := readFile(pathbuilder.GetPathInProject(project, "literatur.json"))
	if err != nil {
		return nil, err
	}
	//fmt.Println(string(file))
	var bibEntries []BibEntry
	err = json.Unmarshal([]byte(file), &bibEntries)
	if err != nil {
		return nil, err
	}

	return bibEntries, nil
}

func WriteEntries(project string, entries []BibEntry) error {
	data, err := json.Marshal(entries)
	if err != nil {
		return err
	}

	return ioutil.WriteFile(pathbuilder.GetPathInProject(project, "literatur.json"), data, 0777)
}
