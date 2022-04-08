package domain

import (
	"encoding/json"
	"io/ioutil"
	"strings"
)

func SaveEntry(entry BibEntry, project string, initialKey string) error{
	entries, err := ReadBibEntries(project)
	// fmt.Println(entry)
	//if len(saveObj.InitialKey)  == 0 {
	//	entries = append(entries, entry)
	//} else {
	found := false;
	for i:= 0 ; i<len(entries) ; i++ {
		if strings.Compare(entries[i].Key, initialKey) == 0 || strings.Compare(entries[i].Key, entry.Key) == 0 {
			entries[i] =  entry
			found = true
			break
		}
	}
	//}

	if !found {
		entries = append(entries, entry)
	}

	jsonStr, err := json.MarshalIndent(entries, "", "\t")
	//fmt.Println(string(jsonStr))
	if err != nil {
		return err
	}
	err = ioutil.WriteFile("./projects/" + project +"/literatur.json", jsonStr, 0644)
	if err != nil {

		return err
	}

	err = ConvertBibToCSV(project)

	return err
}