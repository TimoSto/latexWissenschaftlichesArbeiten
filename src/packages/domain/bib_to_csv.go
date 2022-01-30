package domain

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"sort"
	"strings"
)

func ConvertBibToCSV(project string) error{
	fmt.Println("Convertig ./projects/"+project+"/literatur.json to literatur.csv...")

	file, err := ioutil.ReadFile("./projects/"+project+"/literatur.json")
	if err != nil {
		return err
	}
	//fmt.Println(string(file))
	var bibEntries []BibEntry
	err = json.Unmarshal([]byte(file), &bibEntries)
	if err != nil {
		return err
	}

	sort.Slice(bibEntries,func(i, j int) bool {
		return strings.ToLower(bibEntries[i].Fields[0]) < strings.ToLower(bibEntries[j].Fields[0])
	})

	filestring := "key;type;a;b;c;d;e;f;g;h;i;j;k;l;m;n;o;p;q;r;s;t;u;v;w;x;y;z;\n"
	for _, entry := range bibEntries{
		filestring += entry.Key + ";" + entry.Typ + ";"
		for i:=0 ; i<26; i++ {
			if i < len(entry.Fields) {
				filestring += entry.Fields[i];
			}
			filestring += ";"
		}
		filestring += "\n"
	}
	filestring += "empty;empty;a;b;c;d;e;f;g;h;i;j;k;l;m;n;o;p;q;r;s;t;u;v;w;x;y;z;\n"
	err = ioutil.WriteFile("./projects/"+project+"/literatur.csv",[]byte(filestring), 0644)
	if err != nil {
		return err
	}
	return nil
}

