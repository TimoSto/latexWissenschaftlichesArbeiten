package domain

import (
	"fmt"
	"io/ioutil"
	"regexp"
	"strings"
)

func CiteCleanup(project string) error{
	texFile, err := ioutil.ReadFile("./projects/" + project + "/" + project + ".tex")
	if err != nil {
		return err
	}

	reg := regexp.MustCompile(`citebib{(.*?)}{(.*?)}{(.*?)}`)
	matches := reg.FindAllString(string(texFile), -1)
	var citedEntries []string
	filecontent := "ckey;\n"
	for _,match := range matches {
		match = strings.Split(match, "citebib{")[1]
		match = strings.Split(match, "}")[0]
		if SliceIndex(len(citedEntries), func (i int) bool { return strings.Compare(citedEntries[i], match) == 0 }) == -1 {
			citedEntries = append(citedEntries, match)
			filecontent += fmt.Sprintf("%s;\n", match)
		}
	}
	err = ioutil.WriteFile(fmt.Sprintf("./projects/%s/citedKeys.csv", project), []byte(filecontent), 0644)
	if err != nil {
		return err
	}
	return nil
}


func SliceIndex(limit int, predicate func(i int) bool) int {
	for i := 0; i < limit; i++ {
		if predicate(i) {
			return i
		}
	}
	return -1
}