package main

import (
	"WA_LaTeX/internal/config"
	"WA_LaTeX/pkg/logger"
)

func main() {
	logger.Init()

	logger.LogInfo("Starting up ThesorTeX...")

	config.ReadConfig()

}
