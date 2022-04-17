package conf

import (
	_ "embed"
	"fmt"
	"gopkg.in/ini.v1"
	"os"
)

//go:embed VERSION
var Version string

var AutoOpenBrowser = false
var OverrideExistingEntries = false

func ReadConfig() {
	cfg, err := ini.Load("Config.ini")
	if err == nil {
		AutoOpenBrowser, err = cfg.Section("").Key("autoOpenBrowser").Bool()
		OverrideExistingEntries, err = cfg.Section("").Key("overrideExistingEntries").Bool()
	}
}

func WriteConfig(autoBrowserOpen string, override string) error{
	cfg, err := ini.Load("Config.ini")
	if err != nil {
		_, err = os.Create("Config.ini")
		if err != nil {
			return err
		}
		cfg, err = ini.Load("Config.ini")
		if err != nil {
			return err
		}
	}
	fmt.Println(autoBrowserOpen)
	cfg.Section("").Key("autoOpenBrowser").SetValue(autoBrowserOpen)
	cfg.Section("").Key("overrideExistingEntries").SetValue(override)
	return cfg.SaveTo("Config.ini")

}