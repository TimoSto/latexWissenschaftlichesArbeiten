package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"sort"
	"strings"
)

type BibEntry struct {
	Key string
	Typ string
	Autor string
	Titel string
	Auflage string
	Ort string
	Datum string
	Hrsg string
	Band string
	Zeitschrift string
	Seiten string
	Festschrift string
	AutorSammelwerk string
	TitelSammelwerk string
	URL string
	Stand string
}

func main(){
	fmt.Println("Convertig literatur.json to literatur.csv...")

	file, err := ioutil.ReadFile("literatur.json")
	if err != nil {
		fmt.Println(fmt.Sprintf("Error occurred while opening the JSON-file:%v", err))
		return
	}
	//fmt.Println(string(file))
	var bibEntries []BibEntry
	err = json.Unmarshal([]byte(file), &bibEntries)
	if err != nil {
		fmt.Println(fmt.Sprintf("Error occurred while parsing the JSON-file:%v", err))
		return
	}

	sort.Slice(bibEntries,func(i, j int) bool {
		return strings.ToLower(bibEntries[i].Autor) < strings.ToLower(bibEntries[j].Autor)
	})

	filestring := "key;type;autor;titel;auflage;ort;datum;hrsg;band;zeitschrift;seiten;festschrift;autorsammelwerk;titelsammelwerk;url;stand;\n"
	for _, entry := range bibEntries{
		//switch entry.Typ {
		//case "buch": filestring += entry.Key + ";buch;" + entry.Autor + ";" + entry.Titel + ";" + entry.Auflage + ";" + entry.Ort + ";" +entry.Datum + ";" + entry.Hrsg + "\n"
		//case "kommentar": filestring += entry.Key + ";kommentar;" + entry.Autor + ";" + entry.Titel + ";" +entry.Auflage + ";" + entry.Ort + ";" +entry.Datum + ";" + entry.Hrsg + ";" + entry.Band +"\n"
		//case "aufsatz": filestring += entry.Key + ";essay;" + entry.Autor + ";" + entry.Titel + ";;" + entry.Ort +";" + entry.Datum +";;;" + entry.Zeitschrift + ";" + entry.Seiten + "\n"
		//case "festschrift": filestring += entry.Key + ";festschrift;" + entry.Autor + ";" + entry.Titel + ";;" + entry.Ort +";" + entry.Datum + ";;;;" + entry.Seiten + ";" +entry.Festschrift +"\n"
		//case "sammelwerk": filestring += entry.Key + ";sammelwerk;" + entry.Autor + ";" + entry.Titel + ";;" + entry.Ort +";" + entry.Datum + ";;;;" + entry.Seiten + ";;" + entry.AutorSammelwerk + ";" + entry.TitelSammelwerk +"\n"
		//case "online": filestring += entry.Key + ";online;" + entry.Autor + ";" + entry.Titel + ";;;" + entry.Abgerufen + ";;;;;;;" + entry.URL + " (Stand: " + entry.Stand + ")" + "\n"
		//default:
		filestring += entry.Key + ";" + entry.Typ + ";" + entry.Autor + ";" + entry.Titel + ";" + entry.Auflage + ";" + entry.Ort + ";" + entry.Datum + ";" + entry.Hrsg + ";" + entry.Band + ";" + entry.Zeitschrift + ";" + entry.Seiten + ";" + entry.Festschrift + ";" + entry.AutorSammelwerk + ";" + entry.TitelSammelwerk + ";" +entry.URL + ";" +entry.Stand + "\n"
		//}
	}
	filestring += "empty;empty;autor;titel;auflage;ort;datum;hrsg;band;zeitschrift;seiten;festschrift;autorsammelwerk;titelsammelwerk;url;stand\n"
	err = ioutil.WriteFile("literatur.csv",[]byte(filestring), 0644)
	if err != nil {
		fmt.Println(fmt.Sprintf("Error occurred while writing CSV-file:%v", err))
		return
	}
}