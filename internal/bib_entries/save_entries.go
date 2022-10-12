package bib_entries

import (
	"WA_LaTeX/internal/pathbuilder"
	"encoding/json"
	"fmt"
	"io/fs"
	"strings"

	"WA_LaTeX/internal/conf"
	"WA_LaTeX/pkg/logger"
)

func SaveEntries(entries []BibEntry, project string, initialKeys []string, override bool, readFile func(string) ([]byte, error), writeFile func(string, []byte, fs.FileMode) error) (error, int, int) {

	existingEntries, err := ReadBibEntries(project, readFile)
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

		//if len(entry.Fields) == 0 {
		//	return fmt.Errorf("empty fields. You propably uploaded an invalid file."), 0, 0
		//}

		if entry.Key != initialKeys[n] {
			//if key is changed, make sure it does not already exist
			for i := 0; i < len(existingEntries); i++ {
				if strings.Compare(existingEntries[i].Key, entry.Key) == 0 {
					return fmt.Errorf("Entry with key '%s' already exists. Delete the old one or rename the new one.", entry.Key), 0, 0
				}
			}
		}

		//bType, err := GetType(project, entry.Typ)
		//if err != nil {
		//
		//	return err, 0, 0
		//}
		//
		//for i, field := range entry.Fields {
		//	if i < len(bType.Fields) {
		//		if bType.Fields[i].TexValue {
		//			entry.Fields[i] =
		//		}
		//	}
		//}

		found := false
		for i := 0; i < len(existingEntries); i++ { //TODO: override vereinheitlichen
			if strings.Compare(existingEntries[i].Key, initialKeys[n]) == 0 && override {
				existingEntries[i] = entry
				found = true
				changed++
				break
			} else if strings.Compare(existingEntries[i].Key, entry.Key) == 0 {
				if !conf.ConfigObj.OverrideExistingEntries || !override {
					logger.LogInfo(fmt.Sprintf("Entry with key '%s' already exists. Delete the old one or rename the new one.", entry.Key))
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
	err = writeFile(pathbuilder.GetPathInProject(project, "literatur.json"), jsonStr, 0644)
	if err != nil {

		return err, 0, 0
	}

	err = ConvertBibToCSV(project, readFile, writeFile)

	//fmt.Println(changed, added)

	return err, added, changed
}
