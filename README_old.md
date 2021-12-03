# LaTeX-Vorlage für wissenschaftliche Arbeiten
Hier wird die Verwendung dieser Vorlage beschrieben. Falls Interesse an der Art der Umsetzung besteht, schau in den techDoku-Ordner.
## Dokumentenklasse und Struktur
Hier wird ie Dokumentenklasse "article" mit der Schriftgröße 12pt verwendet. Diese wird dann für den Standard-Text angewandt.
Die Struktur hat 5 Ebenen (Part - Subparagraph). Die Nummerierung kann numerisch erfolgen:
```
1 Part
  1.1 Section
      1.1.1 Subsection
            1.1.1.1 Subsubsection
                    1.1.1.1.1 Paragraph
                              1.1.1.1.1.1 Subparagraph
```
Dazu müssen die Pakete für Überschriften und Inhaltsverzeichnis folgendermaßen eingebunden werden: `\usepackage[numeric]{ueberschriften}` und `\usepackage[numeric]{inhaltsverzeichnis}`.  
Es kann aber auch Latours Nummerierung verwendet werden: `\usepackage[latour]{ueberschriften}` und `\usepackage[latour]{inhaltsverzeichnis}`
```
A Part
 I Section
  1 Subsection
    a) Subsubsection
      aa) Paragraph
        (1) Subparagraph
```
## Überschriften anpassen
Um die Überschriften alle zu nummerieren: ``\setcounter{secnumdepth}{6}``
## Inhaltsverzeichnis
Damit die Linien bis zur Seitenzahl gehen, muss im Dokument selbst anstatt nur des ToC-Befehls folgendes geschrieben werden:
```latex
{\def\makebox[#1][#2]#3{#3}%
	\tableofcontents
}
```
## Abkürzungsverzeichnis
Die Abkürzungen werden in einer CSV-Datei geführt:
```latex
abk;bed
z.B.;zum Beispiel
s.o.;siehe oben
```
Das Auslesen erfolgt über LaTeX`s datatool-Package. Um die Abkürzungen in der hiesigen Form (abk......bed) auszugeben:
``\printabbreviations``
## Fußnoten
Der Abstand zwischen Fußnote und Zahl wird initial auf 3mm gesetzt:
```latex
%Abstand Fußnote - Zahl
\setlength{\footnotemargin}{3.5mm}
```
ACHTUNG: Der Abstand passt sich nicht an die Breite der Zahl an. Ab Fußnote 10 muss der Abstand also manuell erhöht werden. Dazu einfach im Dokument ``\setlength{\footnotemargin}{5mm}`` mit dem gewünschten Wert aufrufen.
## Header und Footer
Es ist möglich, eine Kopf- und Fußzeile einzubinden. Dazu werden zwei Page-Stile erstellt.

Der ``main``-Stil hat einen Header, der mit einer Linie abgetrennt ist. Oben links steht der Titel der Arbeit (über ``\renewcommand{\mytitle}{MEIN TITEL}`` änderbar). Oben rechts steht der Titel des aktuellen Parts (Bsp.: Part 1 - Section 2 => oben links steht der Titel von Part 1). Der Footer ist ebenfalls über eine Linie abgetrennt und hat links den Autor (über ``\renewcommand{myauthor}{Mein Name}`` änderbar) und rechts die Seitenzahl.
Der ``plain``-Stil ist für die Verzeichnisse gedacht und ist genauso, wie der ``main``-Stil, hat aber oben rechts nicht den Part-Titel, sondern es wird der Befehl ``\plaintitle`` genutzt. Dieser hat den Wert "Abkürzungsverzeichnis". Beim Inhaltsverzeichnis muss dann ``\renewcommand{\plaintitle}{Inhaltsverzeichnis}`` aufgerufen werden, damit oben rechts "Inhaltsverzeichnis steht". Genauso beim Literaturverzeichnis.
Die Befehle, um zwischen den Stilen zu wechseln sind ``\frontmatter`` für die Verzeichnisse und ``\mainmatter`` für den Hauptteil:
```latex
\appto\frontmatter{\pagestyle{plain}}
\appto\mainmatter{\pagestyle{main}}
```
## Literaturverzeichnis
Es gibt von LaTeX selbst ein System für Literaturverzeichnisse, BibTeX. In diesem System sind Anpassungen aber sehr kompliziert, weshalb ich mich entschieden habe, es nicht zu verwenden. Stattdessen habe ich ein eigenes System zur Literaturverwaltung entwickelt.

Die Literatur-Einträge stehen im JSON-Format in der Datei ``literatur.json``. Das Manegement der Einträge kann über den ebenfalls in diesem Projekt enthaltenen Webserver `WA_LaTeX.exe` erfolgen. Dieser startet auf Port 8081. Die Startseite ist unter `http://localhost:8081/overview` zu erreichen. In der GUI können sowohl Literatur-Einträge, als auch Literatur-Typen erstellt, bearbeitet und gelöscht werden.
> ACHTUNG: Sonderzeichen wie "_" können zu Fehlern führen. Falls also nach dem Eintragen eines neuen Eintrags in die literatur.json und dem Kompilieren in die CSV beim Kompilieren des TeX-Dokumentes ein Fehler auftritt und irgendwelche besonderen Zeichen verwendet wurden, einfach in der literatur.json anstelle des sonderzeichens {\*SONDERZEICHEN"} schreiben. Für "_" also {\_}.
### Literaturverzeichnis ausgeben
Das Literaturverzeichnis kann über `\printMyBibliography` ausgegeben werden. Der Stil der Einträge ist in der GUI bearbeitbar.
### Zitate
Für Zitate aus den Quellen im Litaraturverzeichnis kann der Befehl ``\citebib{KEY}{SEITEN ODER RANDNUMMER}{Vgl. oder leer}`` verwendet werden. Der erste Parameter ist dabei der Key, der in literatur.json für die Quelle vergeben wurde. Der zweite Parameter wird hinter das Zitat platzier, z.B. Seitenzahlen oder die Randnummer. Falls das Zitat vergleichend ist, muss als dritter Parameter {Vgl. } übergeben werden. Bei einem wörtlichen Zitat kann einfach {} übergeben werden.
```latex
\citebib{book1}{S.101}{}
```
Ergibt eine Fußnote "Autor, Titel (Jahr), S.101.".
```latex
\citebib{book1}{S.101}{Vgl. }
```
Ergibt eine Fußnote "Vgl. Autor, Titel (Jahr), S.101.".
###Screenshots
![gui](https://github.com/TimoSto/latexWissenschaftlichesArbeiten/blob/main/dokuImages/gui1.PNG)
![gui](https://github.com/TimoSto/latexWissenschaftlichesArbeiten/blob/main/dokuImages/gui2.PNG)
![gui](https://github.com/TimoSto/latexWissenschaftlichesArbeiten/blob/main/dokuImages/gui3.PNG)
![gui](https://github.com/TimoSto/latexWissenschaftlichesArbeiten/blob/main/dokuImages/gui4.PNG)
![gui](https://github.com/TimoSto/latexWissenschaftlichesArbeiten/blob/main/dokuImages/gui5.PNG)
## Anhang
Für den Anhang können die Befehle ``\anhang{TITEL}``, ``\anhangI{TITEL}`` und ``\anhangII{TITEL}`` verwendet werden. Die Nummerierung erfolgt nach folgendem Raster:
```
1 Anhang 1
  1.1 AnhangI 1
    1.1.1 AnhangII 1
    1.1.2 AnhangII 2
  1.2 AnhangI 2
```
Um das Anhangsverzeichnis auszugeben, oben rechts anzuzeigen und im ToC anzuzeigen, muss
```latex
\renewcommand{\plaintitle}{Anhang}
\addcontentsline{toc}{part}{Anhang}
{\def\makebox[#1][#2]#3{#3}%
\listofanhang
}
```
eingebunden werden.
## Debugging
Um zu sehen, wo Text überläuft oder ähnliches kann im Header des Dokuments die Zeile ``%\usepackage{showframe}`` unkommentiert werden (% entfernen). Dann werden die Boxen von Header, Footer und Hauptteil auf den Seiten angezeigt.
