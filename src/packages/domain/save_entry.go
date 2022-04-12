package domain

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strings"
)

func SaveEntry(entry BibEntry, project string, initialKey string) error{
	if len(entry.Fields) == 0 {
		return fmt.Errorf("empty fields. You propably uploaded an invalid file.")
	}
	entries, err := ReadBibEntries(project)
	// fmt.Println(entry)
	//if len(saveObj.InitialKey)  == 0 {
	//	entries = append(entries, entry)
	//} else {
	found := false;
	for i:= 0 ; i<len(entries) ; i++ {
		if strings.Compare(entries[i].Key, initialKey) == 0 {
			entries[i] =  entry
			found = true
			break
		} else if strings.Compare(entries[i].Key, entry.Key) == 0 {
			fmt.Println(fmt.Sprintf("Entry with key %s already exists. Delete the old one or rename the new one.", entry.Key))
			return fmt.Errorf("Entry with key %s already exists.", entry.Key)
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