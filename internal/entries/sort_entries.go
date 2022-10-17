package entries

import (
	"sort"
	"strings"
)

func SortEntries(entries []BibEntry) []BibEntry {
	sort.Slice(entries, func(i, j int) bool {
		return strings.ToLower(entries[i].Key) < strings.ToLower(entries[j].Key)
	})

	return entries
}
