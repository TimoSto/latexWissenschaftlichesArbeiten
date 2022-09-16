package bib_entries

import (
	"reflect"
	"testing"

	"WA_LaTeX/internal/mockFileSystem"
)

func TestReadBibEntries_2(t *testing.T) {
	entries, err := ReadBibEntries("test", mockFileSystem.ReadFile)
	if err != nil {
		t.Errorf("%s", err)
	}
	if len(entries) != 2 {
		t.Errorf("Expected 2 entries, got %v", len(entries))
	}
	expObj := BibEntry{
		Key: "test1",
		Typ: "aufsatz",
		Fields: []string{
			"aaaatcv",
			"ssdbbbbb",
			"t",
			"s",
			"t",
			"s",
			"t",
			"s",
		},
		Comment:    "",
		CiteNumber: 1,
	}
	if !reflect.DeepEqual(expObj, entries[0]) {
		t.Errorf("expected %v, got %v", expObj, entries[0])
	}
}
