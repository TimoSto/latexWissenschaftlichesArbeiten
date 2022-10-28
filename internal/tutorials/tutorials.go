package tutorials

import (
	"embed"
	_ "embed"
)

//go:embed tutorials
var Tutorials embed.FS
