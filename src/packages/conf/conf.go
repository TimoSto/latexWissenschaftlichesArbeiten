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

func ReadConfig() {
	cfg, err := ini.Load("Config.ini")
	if err == nil {
		AutoOpenBrowser, err = cfg.Section("").Key("autoOpenBrowser").Bool()
	}
}

func WriteConfig(autoBrowserOpen string) error{
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
	return cfg.SaveTo("Config.ini")

}