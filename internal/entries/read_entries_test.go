package entries

import (
	"ThesorTeX/mock/mockFileSystem"
	"testing"
)

func TestReadBibEntriesNoProjectName(t *testing.T) {
	entries, err := ReadBibEntries("", mockFileSystem.ReadFile)
	if len(entries) > 0 || err == nil {
		t.Errorf("expected error, got %v", entries)
	}
}

//TODO: more
