package bib_entries

import (
	"WA_LaTeX/internal/pathbuilder"
	"encoding/json"
	"fmt"
	"sort"
	"strings"
)

type BibEntry struct {
	Key        string
	Typ        string
	Fields     []string
	Comment    string
	CiteNumber int
}

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

	sort.Slice(bibEntries, func(i, j int) bool {
		return strings.ToLower(bibEntries[i].Key) < strings.ToLower(bibEntries[j].Key)
	})

	bibEntries, err = CountCites(project, bibEntries, readFile)
	if err != nil {
		return nil, err
	}

	return bibEntries, nil
}
