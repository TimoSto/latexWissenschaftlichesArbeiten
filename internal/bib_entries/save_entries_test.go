package bib_entries

import (
	"WA_LaTeX/mock/mockFileSystem"
	"reflect"
	"testing"
)

func TestSaveEntriesOnFreshProject(t *testing.T) {
	//err := mockFileSystem.ClearLiterature("test4")
	//if err != nil {
	//	t.Errorf("%s", err)
	//}

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

	err, _, _ := SaveEntries(entries, "test3", []string{""}, true, mockFileSystem.ReadFile, mockFileSystem.WriteFile)
	if err != nil {
		t.Errorf("%s", err)
	}

	nE, err := ReadBibEntries("test3", mockFileSystem.ReadFile)
	if err != nil {
		t.Errorf("%s", err)
	}

	if !reflect.DeepEqual(nE, entries) {
		t.Errorf("expected %v to equal %v", nE, entries)
	}
}

func TestSaveEntriesOnExistingProject(t *testing.T) {
	//err := mockFileSystem.ClearLiterature("test4")
	//if err != nil {
	//	t.Errorf("%s", err)
	//}

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

	err, _, _ := SaveEntries(entries, "test1", []string{""}, true, mockFileSystem.ReadFile, mockFileSystem.WriteFile)
	if err != nil {
		t.Errorf("%s", err)
	}

	nE, err := ReadBibEntries("test1", mockFileSystem.ReadFile)
	if err != nil {
		t.Errorf("%s", err)
	}

	entries = []BibEntry{
		{
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
		},
		{
			Key: "ttt",
			Typ: "aufsatz",
			Fields: []string{
				"test",
				"test",
			},
		},
	}

	if !reflect.DeepEqual(nE, entries) {
		t.Errorf("expected %v to equal %v", nE, entries)
	}
}
