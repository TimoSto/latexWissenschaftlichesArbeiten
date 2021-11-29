package domain

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"sort"
	"strings"
)

type BibEntry struct {
	Key string
	Typ string
	Fields []string
}

func ReadBibEntries() []BibEntry{
	file, err := ioutil.ReadFile("literatur.json")
	if err != nil {
		fmt.Println(fmt.Sprintf("Error occurred while opening the JSON-file:%v", err))
		return []BibEntry{}
	}
	//fmt.Println(string(file))
	var bibEntries []BibEntry
	err = json.Unmarshal([]byte(file), &bibEntries)
	if err != nil {
		fmt.Println(fmt.Sprintf("Error occurred while parsing the JSON-file:%v", err))
		return []BibEntry{}
	}

	sort.Slice(bibEntries,func(i, j int) bool {
		return strings.ToLower(bibEntries[i].Fields[0]) < strings.ToLower(bibEntries[j].Fields[0])
	})

	return bibEntries
}