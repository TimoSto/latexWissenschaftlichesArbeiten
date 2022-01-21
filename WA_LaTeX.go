package main

import (
	"WA_LaTeX/domain"
	"WA_LaTeX/handlers"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
)

func main() {
	argsWithoutProg := os.Args[1:]

	if len(argsWithoutProg) > 1 && strings.Compare(argsWithoutProg[0], "cleanupCites") == 0 {
		//domain.ConvertBibToCSV()
		fmt.Println(argsWithoutProg[1])
		err := domain.CiteCleanup(argsWithoutProg[1])
		if err != nil {
			fmt.Println(err)
		}
		return
	}

	http.HandleFunc("/overview", handlers.HandleOverview)

	http.HandleFunc("/type/", handlers.HandleType)

	http.HandleFunc("/typeFields/", handlers.HandleTypeFields)

	http.HandleFunc("/entry/", handlers.HandleEntry)

	http.HandleFunc("/project/", handlers.HandleProject)

	http.HandleFunc("/save", handlers.HandleSave)

	http.HandleFunc("/saveProjectName", handlers.HandleProjectName)

	http.HandleFunc("/saveEntry", handlers.HandleSaveEntry)

	http.HandleFunc("/delete/type", handlers.HandleDeleteType)

	http.HandleFunc("/delete/entry", handlers.HandleDeleteEntry)

	http.HandleFunc("/delete/project", handlers.HandleDeleteProject)

	http.Handle( "/shell/" , http.StripPrefix("/shell", http.FileServer(http.Dir("./out"))))

	http.HandleFunc("/cleanupCites", handlers.HandleCiteCleanup)

	log.Fatal( http.ListenAndServe(":8081", nil ) )
}