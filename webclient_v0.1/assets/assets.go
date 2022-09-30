package assets

import (
	"embed"
	"io/fs"
)

//go:embed dist/*
var Assets embed.FS

var SubDir, _ = fs.Sub(Assets, "dist")
