package entries

import (
	"ThesorTeX/internal/pathbuilder"
	"encoding/json"
	"fmt"
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
