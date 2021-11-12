package main

import (
	"WA_LaTeX/convertBibToCSV"
	"WA_LaTeX/handlers"
	"log"
	"net/http"
	"os"
	"strings"
)

func main() {
	argsWithoutProg := os.Args[1:]

	if len(argsWithoutProg) > 0 && strings.Compare(argsWithoutProg[0], "convert") == 0 {
		convertBibToCSV.ConvertBibToCSV()
		return
	}

	http.HandleFunc("/overview", handlers.HandleOverview)

	http.HandleFunc("/type/", handlers.HandleType)

	http.HandleFunc("/entry/", handlers.HandleEntry)

	http.HandleFunc("/save", handlers.HandleSave)

	http.HandleFunc("/delete/type", handlers.HandleDeleteType)

	http.HandleFunc("/delete/entry", handlers.HandleDeleteEntry)

	http.Handle( "/assets/" , http.StripPrefix("/assets", http.FileServer(http.Dir("./out"))))

	log.Fatal( http.ListenAndServe(":8081", nil ) )
}