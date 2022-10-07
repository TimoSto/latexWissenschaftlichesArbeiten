package main

import (
	"bufio"
	"context"
	_ "embed"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"os/signal"
	"runtime"
	"strings"
	"syscall"

	"WA_LaTeX/internal/conf"
	"WA_LaTeX/internal/handlers"
	"WA_LaTeX/pkg/logger"
	"WA_LaTeX/pkg/server"
)

//var test = "% This file was created with Citavi 6.11.0.0\n\n@article{Sedlmeir.2020,\n abstract = {When talking about blockchain technology in academia, business, and society, frequently generalizations are still heared about its -- supposedly inherent -- enormous energy consumption. This perception inevitably raises concerns about the further adoption of blockchain technology, a fact that inhibits rapid uptake of what is widely considered to be a groundbreaking and disruptive innovation. However, blockchain technology is far from homogeneous, meaning that blanket statements about its energy consumption should be reviewed with care. The article is meant to bring clarity to the topic in a holistic fashion, looking beyond claims regarding the energy consumption of Bitcoin, which have, so far, dominated the discussion.},\n author = {Sedlmeir, Johannes and Buhl, Hans Ulrich and Fridgen, Gilbert and Keller, Robert},\n year = {2020},\n title = {The Energy Consumption of Blockchain Technology: Beyond Myth},\n pages = {599--608},\n volume = {62},\n number = {6},\n issn = {1867-0202},\n journal = {Business {\\&} Information Systems Engineering},\n doi = {10.1007/s12599-020-00656-x}\n}"

//go:embed compile.bat
var CompileBat string

func main() {

	compFile, err := ioutil.ReadFile("compile.bat")

	if err != nil || string(compFile) != CompileBat {
		err = ioutil.WriteFile("compile.bat", []byte(CompileBat), 0644)
		if err != nil {
			fmt.Println(err)
		}
	}

	conf.ReadConfig()

	argsWithoutProg := os.Args[1:]

	if len(argsWithoutProg) > 0 && argsWithoutProg[0] == "configure" {
		fmt.Println("Konfigurationsassistent für WA_LaTeX")
		v := "Y"
		if !conf.AutoOpenBrowser {
			v = "N"
		}
		fmt.Print(fmt.Sprintf("Soll beim Starten der Anwendung automatisch ein Browser geöffnet werden? (aktuell: %v) [Y/N]", v))
		reader := bufio.NewReader(os.Stdin)
		// ReadString will block until the delimiter is entered
		input, err := reader.ReadString('\n')
		if err != nil {
			fmt.Println("An error occured while reading input. Please try again", err)
			return
		}

		// remove the delimeter from the string
		input = strings.TrimSuffix(input, "\r\n")
		//fmt.Println(input)
		//fmt.Println(len(input))
		autoOpen := "false"
		if strings.ToLower(input) == "y" {
			autoOpen = "true"
		}

		v = "Y"
		if !conf.OverrideExistingEntries {
			v = "N"
		}
		fmt.Print(fmt.Sprintf("Sollen ein ggf. existierender Literatureintrag mit demselben Key beim Speichern oder Hochladen überschrieben werden? (aktuell: %v) [Y/N]", v))
		reader = bufio.NewReader(os.Stdin)
		// ReadString will block until the delimiter is entered
		input, err = reader.ReadString('\n')
		if err != nil {
			fmt.Println("An error occured while reading input. Please try again", err)
			return
		}

		// remove the delimeter from the string
		input = strings.TrimSuffix(input, "\r\n")
		//fmt.Println(input)
		//fmt.Println(len(input))
		override := "false"
		if strings.ToLower(input) == "y" {
			override = "true"
		}

		err = conf.WriteConfig(autoOpen, override)
		if err != nil {
			fmt.Println("Es ist ein Fehler aufgetreten: " + err.Error())
		}
		return
	}

	fmt.Println("Starting Application...")

	logger.Init()

	mux := http.NewServeMux()

	mux.Handle("/", http.HandlerFunc(handlers.HandleAssetsNew))

	mux.Handle("/createProject", http.HandlerFunc(handlers.HandleNewProject))

	mux.Handle("/deleteProject", http.HandlerFunc(handlers.HandleDeleteProject))

	mux.Handle("/backup", http.HandlerFunc(handlers.HandleBackup))

	mux.Handle("/getBackups", http.HandlerFunc(handlers.GetBackupsHandler))

	mux.Handle("/resetToBackup", http.HandlerFunc(handlers.HandleBackupReset))

	mux.Handle("/projectData", http.HandlerFunc(handlers.GetProjectData))

	mux.Handle("/abbreviations", http.HandlerFunc(handlers.HandleSaveAbbreviations))

	//old

	mux.Handle("/saveType", http.HandlerFunc(handlers.HandleSaveType))

	mux.Handle("/deleteType", http.HandlerFunc(handlers.HandleDeleteType))

	mux.Handle("/saveEntry", http.HandlerFunc(handlers.HandleSaveEntry))

	mux.Handle("/uploadEntries", http.HandlerFunc(handlers.HandleUploadEntries))

	mux.Handle("/deleteEntry", http.HandlerFunc(handlers.HandleDeleteEntry))

	mux.Handle("/setDefault", http.HandlerFunc(handlers.HandleDefaultSetter))

	mux.Handle("/refreshTypes", http.HandlerFunc(handlers.HandleRefreshTypes))

	//mux.Handle("/importCitavi", server.HandleImportCitavi)

	mux.Handle("/citeCleanup", http.HandlerFunc(handlers.HandleCiteCleanup))

	mux.Handle("/documentation", http.HandlerFunc(handlers.HandleDocumentation))

	mux.Handle("/cvTemplate", http.HandlerFunc(handlers.HandleCVTemplate))

	mux.Handle("/getFile", http.HandlerFunc(handlers.GetTeX))

	mux.Handle("/saveAndCompile", http.HandlerFunc(handlers.SaveAndCompile))

	mux.Handle("/getPDF", http.HandlerFunc(handlers.GetPDF))

	mux.Handle("/getProjects", http.HandlerFunc(handlers.GetProjectsHandler))

	mux.Handle("/getBibTypes", http.HandlerFunc(handlers.GetBibTypesHandler))

	mux.Handle("/getBibEntries", http.HandlerFunc(handlers.GetBibEntriesHandler))

	logger.LogInfo("Open http://localhost:8081/overview to get started.")

	go startServer(mux)

	openbrowser("http://localhost:8081/overview")

	sigs := make(chan os.Signal, 1)
	//done := make(chan bool, 1)

	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)

	logger.LogInfo("waiting for exit...")

	sig := <-sigs
	logger.LogInfo(fmt.Sprintf("Received exit-signal: %v", sig))
}

func openbrowser(url string) {

	if !conf.AutoOpenBrowser {
		logger.LogInfo("Automatically opening browser is disabled")
		return
	}
	logger.LogInfo("Automatically opening browser is enabled")

	var err error

	switch runtime.GOOS {
	case "linux":
		err = exec.Command("xdg-open", url).Start()
	case "windows":
		err = exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case "darwin":
		err = exec.Command("open", url).Start()
	default:
		err = fmt.Errorf("unsupported platform")
	}
	if err != nil {
		log.Fatal(err)
	}

}

func startServer(mux http.Handler) {
	isSecure := strings.ToUpper(conf.Protocol) == "HTTPS"
	port := 8081
	srvConfig := server.Config{
		Handler:  mux,
		IsSecure: isSecure,
		Port:     int(port),
	}
	srv, err := server.New(&srvConfig)
	if err != nil {
		logger.LogError("could not start webserver: ", err.Error())
		os.Exit(1)
	}
	finished := make(chan bool, 1)
	srv.Start(context.Background(), finished)
}
