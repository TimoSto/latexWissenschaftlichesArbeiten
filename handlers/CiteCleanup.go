package handlers

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"regexp"
	"strings"
)

func HandleCiteCleanup(w http.ResponseWriter, r *http.Request) {

	project, ok := r.URL.Query()["project"]

	if !ok || len(project[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		http.Error(w, "Url Param 'key' is missing", http.StatusBadRequest)
		return
	}

	texFile, err := ioutil.ReadFile("./projects/" + project[0] + "/" + project[0] + ".tex")
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
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
	err = ioutil.WriteFile(fmt.Sprintf("./projects/%s/citedKeys.csv", project[0]), []byte(filecontent), 0644)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
}

func SliceIndex(limit int, predicate func(i int) bool) int {
	for i := 0; i < limit; i++ {
		if predicate(i) {
			return i
		}
	}
	return -1
}