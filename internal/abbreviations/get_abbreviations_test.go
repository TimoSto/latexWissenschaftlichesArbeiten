package abbreviations

import (
	"WA_LaTeX/mock/mockFileSystem"
	"testing"
)

func TestFilledAbbreviations(t *testing.T) {
	abbrs, _ := GetAbbreviations("project_with_abks", mockFileSystem.ReadFile)

	if len(abbrs) != 2 {
		t.Errorf("expected 2, got %v", len(abbrs))
	}
	if abbrs[0].Abk != "tbd" || abbrs[0].Bed != "to be done" {
		t.Errorf("expected tbd-to be done, got %v", abbrs[0])
	}
	if abbrs[1].Abk != "CMD" || abbrs[1].Bed != "Kommandozeile" {
		t.Errorf("expected CMD-Kommandozeile, got %v", abbrs[1])
	}
}

func TestEmptyAbbreviations(t *testing.T) {
	abbrs, _ := GetAbbreviations("project_without_abks", mockFileSystem.ReadFile)

	if len(abbrs) != 0 {
		t.Errorf("expected 0, got %v", len(abbrs))
	}
}
