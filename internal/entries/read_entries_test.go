package entries

import (
	"ThesorTeX/mock/mockFileSystem"
	"reflect"
	"testing"
)

func TestReadBibEntriesNoProjectName(t *testing.T) {
	entries, err := ReadBibEntries("", mockFileSystem.ReadFile)
	if len(entries) > 0 || err == nil {
		t.Errorf("expected error, got %v", entries)
	}
}

func TestReadBibEntries(t *testing.T) {
	entries, err := ReadBibEntries("test1", mockFileSystem.ReadFile)
	if len(entries) != 1 || err != nil {
		t.Errorf("unexpected error %v , got %v", err.Error(), entries)
	}
	eE := BibEntry{
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
	if !reflect.DeepEqual(eE, entries[0]) {
		t.Errorf("epected %v, got %v", eE, entries[0])
	}
}
