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
	Autor string
	Titel string
	Auflage string
	Ort string
	Datum string
	Hrsg string
	Band string
	Zeitschrift string
	Seiten string
	Festschrift string
	AutorSammelwerk string
	TitelSammelwerk string
	URL string
	Stand string
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
		return strings.ToLower(bibEntries[i].Autor) < strings.ToLower(bibEntries[j].Autor)
	})

	return bibEntries
}