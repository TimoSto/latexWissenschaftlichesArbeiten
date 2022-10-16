package main

import (
	"ThesorTeX/internal/config"
	"ThesorTeX/internal/pathbuilder"
	"ThesorTeX/internal/pipeline"
	"ThesorTeX/pkg/logger"
	"ThesorTeX/pkg/webserver"
	"fmt"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	logger.Init()

	logger.LogInfo("Starting up ThesorTeX...")

	pathbuilder.Init()

	config.ReadConfig()

	resources := pipeline.CreateHandlerPipeline()

	server := webserver.Handle(resources)

	socket, err := net.Listen("tcp", fmt.Sprintf("0.0.0.0:%v", config.ConfigObj.Port))
	if err != nil {
		logger.LogError("Getting port", err.Error())
		logger.LogInfo("Exiting...")
		os.Exit(1)
	}

	go startServer(socket, server)

	logger.LogInfo(fmt.Sprintf("Open your Browser at http://localhost:%s", config.ConfigObj.Port))

	sigs := make(chan os.Signal, 1)

	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)

	logger.LogInfo("Waiting for exit...")

	sig := <-sigs

	logger.LogInfo(fmt.Sprintf("Received exit-signal: %v", sig))

}

func startServer(socket net.Listener, server http.Handler) {
	err := webserver.Serve(socket, server)
	if err != nil {
		logger.LogError("Starting server", err.Error())
		logger.LogInfo("Exiting...")
		os.Exit(1)
	}
}
