package bib_entries

import (
	"fmt"
	"io/ioutil"
	"strings"
)

func CountCites(project string, entries []BibEntry) ([]BibEntry, error) {
	file, err := ioutil.ReadFile("projects/" + project + "/" + project + ".tex")
	if err != nil {
		return nil, err
	}

	fileStr := string(file)

	for i, _ := range entries {
		index := len(fileStr)
		for true {
			match := strings.LastIndex(fileStr[0:index], fmt.Sprintf("\\citebib{%s}", entries[i].Key))
			if match == -1 {
				break
			} else {
				index = match
				left := strings.LastIndex(fileStr[0:index], "\n")
				line := fileStr[left:match]
				isComment := false
				cmtIdx := len(line)
				for true {
					match = strings.LastIndex(line[0:cmtIdx], "%")
					if match == -1 {
						break
					}
					cmtIdx = match
					if string(line[match-1]) == `\` {
						continue
					}
					isComment = true
					break
				}
				if !isComment {
					entries[i].CiteNumber++
				}
			}
		}
	}

	return entries, nil
}
