package bib_entries

import (
	"WA_LaTeX/mock/mockFileSystem"
	"reflect"
	"testing"
)

func TestReadBibEntriesWithOne(t *testing.T) {
	entries, err := ReadBibEntries("test1", mockFileSystem.ReadFile)
	if err != nil {
		t.Errorf("%s", err)
	}
	if len(entries) != 1 {
		t.Errorf("Expected 1 entries, got %v", len(entries))
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
		CiteNumber: 0,
	}
	if !reflect.DeepEqual(expObj, entries[0]) {
		t.Errorf("expected %v, got %v", expObj, entries[0])
	}
}

func TestReadBibEntriesWithTwo(t *testing.T) {
	entries, err := ReadBibEntries("test2", mockFileSystem.ReadFile)
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
		CiteNumber: 0,
	}
	if !reflect.DeepEqual(expObj, entries[0]) {
		t.Errorf("expected %v, got %v", expObj, entries[0])
	}

	expObj = BibEntry{
		Key: "test2",
		Typ: "aufsatz",
		Fields: []string{
			"2aaaatcv",
			"2ssdbbbbb",
			"2t",
			"2s",
			"2t",
			"2s",
			"2t",
			"2s",
		},
		Comment:    "",
		CiteNumber: 0,
	}
	if !reflect.DeepEqual(expObj, entries[1]) {
		t.Errorf("expected %v, got %v", expObj, entries[0])
	}
}
