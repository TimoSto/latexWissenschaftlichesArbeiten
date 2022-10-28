package entries

func AddEntry(entry BibEntry, initialKey string, entries []BibEntry, override bool) []BibEntry {

	found := false
	for i, e := range entries {
		if e.Key == initialKey || e.Key == entry.Key {
			if override {
				entries[i] = entry
			}
			found = true
			break
		}
	}

	if !found {
		entries = append(entries, entry)
	}

	return entries
}
