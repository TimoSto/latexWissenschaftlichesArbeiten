package main

import (
	"WA_LaTeX/src/packages/handlers"
	"fmt"
	"log"
	"net/http"
)

//var test = "% This file was created with Citavi 6.11.0.0\n\n@article{Sedlmeir.2020,\n abstract = {When talking about blockchain technology in academia, business, and society, frequently generalizations are still heared about its -- supposedly inherent -- enormous energy consumption. This perception inevitably raises concerns about the further adoption of blockchain technology, a fact that inhibits rapid uptake of what is widely considered to be a groundbreaking and disruptive innovation. However, blockchain technology is far from homogeneous, meaning that blanket statements about its energy consumption should be reviewed with care. The article is meant to bring clarity to the topic in a holistic fashion, looking beyond claims regarding the energy consumption of Bitcoin, which have, so far, dominated the discussion.},\n author = {Sedlmeir, Johannes and Buhl, Hans Ulrich and Fridgen, Gilbert and Keller, Robert},\n year = {2020},\n title = {The Energy Consumption of Blockchain Technology: Beyond Myth},\n pages = {599--608},\n volume = {62},\n number = {6},\n issn = {1867-0202},\n journal = {Business {\\&} Information Systems Engineering},\n doi = {10.1007/s12599-020-00656-x}\n}"

func main() {

	//entry, err := domain.CitaviToJSON(test)
	//if err != nil {
	//	fmt.Println(err)
	//	return
	//}
	//
	//err = domain.SaveEntry(entry, "neuesTestProjekt", "")
	//if err != nil {
	//	fmt.Println(err)
	//	return
	//}

	fmt.Println("Starting Application...")

	http.HandleFunc("/overview", handlers.HandleOverview)

	http.HandleFunc("/createProject", handlers.HandleNewProject)

	http.HandleFunc("/projects/", handlers.HandleGetProject)

	http.HandleFunc("/editType", handlers.HandleEditType)

	http.HandleFunc("/saveType", handlers.HandleSaveType)

	http.HandleFunc("/deleteType", handlers.HandleDeleteType)

	http.HandleFunc("/editEntry", handlers.HandleEditEntry)

	http.HandleFunc("/typeFields/", handlers.HandleTypeFields)

	http.HandleFunc("/saveEntry", handlers.HandleSaveEntry)

	http.HandleFunc("/deleteEntry", handlers.HandleDeleteEntry)

	http.HandleFunc("/deleteProject", handlers.HandleDeleteProject)

	http.HandleFunc("/importCitavi", handlers.HandleImportCitavi)

	http.HandleFunc("/citeCleanup", handlers.HandleCiteCleanup)

	http.HandleFunc("/", handlers.HandleAssets)

	fmt.Println("Open http://localhost:8081/overview to get started.")

	log.Fatal( http.ListenAndServe(":8081", nil ) )
}