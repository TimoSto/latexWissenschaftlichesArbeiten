package entries

import (
	"reflect"
	"testing"
)

func TestAddEntry_NewOverride(t *testing.T) {
	entries := []BibEntry{
		{
			Key: "test1",
		},
		{
			Key: "test2",
		},
	}

	entry := BibEntry{
		Key: "test3",
	}

	entries = AddEntry(entry, "test3", entries, true)

	expected := []BibEntry{
		{
			Key: "test1",
		},
		{
			Key: "test2",
		},
		{
			Key: "test3",
		},
	}

	if !reflect.DeepEqual(entries, expected) {
		t.Errorf("expected %v, got %v", expected, entries)
	}

}

func TestAddEntry_ExistingOverride(t *testing.T) {
	entries := []BibEntry{
		{
			Key: "test1",
		},
		{
			Key:    "test2",
			Fields: []string{"hallo"},
		},
	}

	entry := BibEntry{
		Key: "test2",
	}

	entries = AddEntry(entry, "test3", entries, true)

	expected := []BibEntry{
		{
			Key: "test1",
		},
		{
			Key: "test2",
		},
	}

	if !reflect.DeepEqual(entries, expected) {
		t.Errorf("expected %v, got %v", expected, entries)
	}

}

func TestAddEntry_NewNoOverride(t *testing.T) {
	entries := []BibEntry{
		{
			Key: "test1",
		},
		{
			Key: "test2",
		},
	}

	entry := BibEntry{
		Key: "test3",
	}

	entries = AddEntry(entry, "test3", entries, false)

	expected := []BibEntry{
		{
			Key: "test1",
		},
		{
			Key: "test2",
		},
		{
			Key: "test3",
		},
	}

	if !reflect.DeepEqual(entries, expected) {
		t.Errorf("expected %v, got %v", expected, entries)
	}

}

func TestAddEntry_ExistingNoOverride(t *testing.T) {
	entries := []BibEntry{
		{
			Key: "test1",
		},
		{
			Key:    "test2",
			Fields: []string{"hallo"},
		},
	}

	entry := BibEntry{
		Key: "test2",
	}

	entries = AddEntry(entry, "test3", entries, false)

	expected := []BibEntry{
		{
			Key: "test1",
		},
		{
			Key:    "test2",
			Fields: []string{"hallo"},
		},
	}

	if !reflect.DeepEqual(entries, expected) {
		t.Errorf("expected %v, got %v", expected, entries)
	}

}
