package domain

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strings"
)

func SaveEntries(entries []BibEntry, project string, initialKeys []string) error{

	existingEntries, err := ReadBibEntries(project)
	if err != nil {
		return err
	}
	// fmt.Println(entry)
	//if len(saveObj.InitialKey)  == 0 {
	//	entries = append(entries, entry)
	//} else {

	for n,entry := range entries {

		if len(entry.Fields) == 0 {
			return fmt.Errorf("empty fields. You propably uploaded an invalid file.")
		}

		found := false
		for i:= 0 ; i<len(existingEntries) ; i++ {
			if strings.Compare(existingEntries[i].Key, initialKeys[n]) == 0 {
				existingEntries[i] =  entry
				found = true
				break
			} else if strings.Compare(existingEntries[i].Key, entry.Key) == 0 {
				fmt.Println(fmt.Sprintf("Entry with key %s already exists. Delete the old one or rename the new one.", entry.Key))
				return fmt.Errorf("Entry with key %s already exists.", entry.Key)
			}
		}
		//}

		if !found {
			existingEntries = append(existingEntries, entry)
		}
	}

	jsonStr, err := json.MarshalIndent(existingEntries, "", "\t")
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