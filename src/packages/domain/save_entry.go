package domain

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strings"

	"WA_LaTeX/src/packages/conf"
	"WA_LaTeX/src/tools/logger"
)

func SaveEntries(entries []BibEntry, project string, initialKeys []string) (error, int, int) {

	existingEntries, err := ReadBibEntries(project)
	if err != nil {
		return err, 0, 0
	}
	// fmt.Println(entry)
	//if len(saveObj.InitialKey)  == 0 {
	//	entries = append(entries, entry)
	//} else {

	added := 0
	changed := 0

	for n, entry := range entries {

		if len(entry.Fields) == 0 {
			return fmt.Errorf("empty fields. You propably uploaded an invalid file."), 0, 0
		}

		if entry.Key != initialKeys[n] {
			//if key is changed, make sure it does not already exist
			for i := 0; i < len(existingEntries); i++ {
				if strings.Compare(existingEntries[i].Key, entry.Key) == 0 {
					return fmt.Errorf("Entry with key '%s' already exists. Delete the old one or rename the new one.", entry.Key), 0, 0
				}
			}
		}

		found := false
		for i := 0; i < len(existingEntries); i++ {
			if strings.Compare(existingEntries[i].Key, initialKeys[n]) == 0 {
				existingEntries[i] = entry
				found = true
				changed++
				break
			} else if strings.Compare(existingEntries[i].Key, entry.Key) == 0 {
				if !conf.OverrideExistingEntries {
					logger.LogInfo(fmt.Sprintf("Entry with key %s already exists. Delete the old one or rename the new one.", entry.Key))
					found = true
				} else {
					existingEntries[i] = entry
					found = true
					changed++
					break
				}
				//return fmt.Errorf("Entry with key %s already exists.", entry.Key)
			}
		}
		//}

		if !found {
			existingEntries = append(existingEntries, entry)
			added++
		}
	}

	jsonStr, err := json.MarshalIndent(existingEntries, "", "\t")
	//fmt.Println(string(jsonStr))
	if err != nil {
		return err, 0, 0
	}
	err = ioutil.WriteFile("./projects/"+project+"/literatur.json", jsonStr, 0644)
	if err != nil {

		return err, 0, 0
	}

	err = ConvertBibToCSV(project)

	//fmt.Println(changed, added)

	return err, added, changed
}
