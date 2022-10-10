package bib_entries

import (
	"reflect"
	"testing"

	"WA_LaTeX/internal/mockFileSystem"
)

func TestSaveEntries(t *testing.T) {
	err := mockFileSystem.ClearLiterature("test4")
	if err != nil {
		t.Errorf("%s", err)
	}

	entries := []BibEntry{
		{
			Key: "ttt",
			Typ: "aufsatz",
			Fields: []string{
				"test",
				"test",
			},
		},
	}

	err, _, _ = SaveEntries(entries, "test4", []string{""}, true, mockFileSystem.ReadFile, mockFileSystem.WriteFile)
	if err != nil {
		t.Errorf("%s", err)
	}

	nE, err := ReadBibEntries("test4", mockFileSystem.ReadFile)
	if err != nil {
		t.Errorf("%s", err)
	}

	if !reflect.DeepEqual(nE, entries) {
		t.Errorf("expected %v to equal %v", nE, entries)
	}
}
