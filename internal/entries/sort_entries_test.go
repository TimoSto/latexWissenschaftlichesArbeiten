package entries

import (
	"reflect"
	"testing"
)

func TestSortEntries(t *testing.T) {
	e := []BibEntry{
		{
			Key: "test",
		},
		{
			Key: "atest",
		},
		{
			Key: "btest",
		},
		{
			Key: "aatest",
		},
	}

	es := []BibEntry{
		{
			Key: "aatest",
		},
		{
			Key: "atest",
		},
		{
			Key: "btest",
		},
		{
			Key: "test",
		},
	}

	sorted := SortEntries(e)

	if !reflect.DeepEqual(sorted, es) {
		t.Errorf("expected %v to equal %v", sorted, es)
	}
}
