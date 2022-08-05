package domain

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
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

func ReadBibEntries(project string) ([]BibEntry, error) {
	if len(project) == 0 {
		return nil, fmt.Errorf("No Project Name provided")
	}
	file, err := ioutil.ReadFile("projects/" + project + "/literatur.json")
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
		return strings.ToLower(bibEntries[i].Fields[0]) < strings.ToLower(bibEntries[j].Fields[0])
	})

	bibEntries, err = CountCites(project, bibEntries)
	if err != nil {
		return nil, err
	}

	return bibEntries, nil
}
