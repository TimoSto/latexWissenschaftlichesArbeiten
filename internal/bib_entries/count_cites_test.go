package bib_entries

import (
	"WA_LaTeX/mock/mockFileSystem"
	"testing"
)

func TestCountCites_empty(t *testing.T) {
	entries, err := ReadBibEntries("test", mockFileSystem.ReadFile)
	if err != nil {
		t.Errorf("%s", err)
	}
	for _, e := range entries {
		if e.CiteNumber != 0 {
			t.Errorf("expected 0 cites for entry %s, got %v", e.Key, e.CiteNumber)
		}
	}
}

func TestCountCites_one(t *testing.T) {
	entries, err := ReadBibEntries("test2", mockFileSystem.ReadFile)
	if err != nil {
		t.Errorf("%s", err)
	}
	if entries[0].CiteNumber != 1 {
		t.Errorf("expected 1 cites for entry %s, got %v", entries[0].Key, entries[0].CiteNumber)
	}
}
