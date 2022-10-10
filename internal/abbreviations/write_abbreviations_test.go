package abbreviations

import (
	"WA_LaTeX/mock/mockFileSystem"
	"testing"
)

func TestWriteToFilled(t *testing.T) {
	abbrs := []Abbreviation{
		{
			Abk: "AA",
			Bed: "Allerbeste Abkürzung",
		},
		{
			Abk: "BB",
			Bed: "Beste Bedeutung",
		},
	}

	err := WriteAbbreviations(abbrs, "project_with_abks", mockFileSystem.WriteFile)

	if err != nil {
		t.Errorf("unexpected error: %v", err)
	}

	abbrs, _ = GetAbbreviations("project_with_abks", mockFileSystem.ReadFile)

	if len(abbrs) != 2 {
		t.Errorf("expected 2, got %v", len(abbrs))
	}
	if abbrs[0].Abk != "AA" || abbrs[0].Bed != "Allerbeste Abkürzung" {
		t.Errorf("expected AA - Allerbeste Abkürzung, got %v", abbrs[0])
	}
	if abbrs[1].Abk != "BB" || abbrs[1].Bed != "Beste Bedeutung" {
		t.Errorf("expected BB - Beste Bedeutung, got %v", abbrs[1])
	}

}
