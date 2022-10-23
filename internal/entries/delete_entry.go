package entries

import "io/ioutil"

func DeleteBibliographyEntry(project string, key string) error {
	entries, err := ReadBibEntries(project, ioutil.ReadFile)
	if err != nil {
		return err
	}
	for i, e := range entries {
		if e.Key == key {
			entries = append(entries[:i], entries[i+1:]...)
			break
		}
	}

	return WriteEntries(project, entries)
}
