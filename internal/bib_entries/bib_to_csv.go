package bib_entries

import (
	"encoding/json"
	"io/fs"
	"sort"
	"strings"

	"WA_LaTeX/pkg/logger"
)

func ConvertBibToCSV(project string, readFile func(string) ([]byte, error), writeFile func(string, []byte, fs.FileMode) error) error {
	logger.LogInfo("Convertig ./projects/" + project + "/literatur.json to literatur.csv...")

	file, err := readFile("./projects/" + project + "/literatur.json")
	if err != nil {
		return err
	}
	//fmt.Println(string(file))
	var bibEntries []BibEntry
	err = json.Unmarshal(file, &bibEntries)
	if err != nil {
		return err
	}

	sort.Slice(bibEntries, func(i, j int) bool {
		return strings.ToLower(bibEntries[i].Fields[0]) < strings.ToLower(bibEntries[j].Fields[0])
	})

	filestring := "key;type;a;b;c;d;e;f;g;h;i;j;k;l;m;n;o;p;q;r;s;t;u;v;w;x;y;z;\n"
	for _, entry := range bibEntries {
		filestring += entry.Key + ";" + entry.Typ + ";"
		for i := 0; i < 26; i++ {
			if i < len(entry.Fields) {
				strToAdd := strings.Replace(entry.Fields[i], "amp;", "", -1)
				filestring += strToAdd
			}
			filestring += ";"
		}
		filestring += "\n"
	}
	filestring += "empty;empty;a;b;c;d;e;f;g;h;i;j;k;l;m;n;o;p;q;r;s;t;u;v;w;x;y;z;\n"

	return writeFile("./projects/"+project+"/literatur.csv", []byte(filestring), 0644)
}
