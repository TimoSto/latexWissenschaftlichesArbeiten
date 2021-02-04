# latexWissenschaftlichesArbeiten
## Dokumentenklasse und Struktur
Hier wird ie Dokumentenklasse "article" mit der Schriftgröße 12pt verwendet. Diese wird dann für den Standard-Text angewandt.
Die Struktur hat 5 Ebenen (Part - Subparagraph). Die Nummerierung folgt folgendem Muster:
```
A Part
 I Section
  1 Subsection
    a) Subsubsection
      aa) Paragraph
        (1) Subparagraph
```
## Überschriften anpassen
Um die ÜBerschriften alle zu nummerieren: ``\setcounter{secnumdepth}{6}``
### Part anpassen
Beim PArt soll (bis auf beim ersten) immer eine neue Seite begonnen werden. Dazu wird der Befehl neu definiert:
```
%Neue Seite für Part und kein vspace vor Part
\newcommand*\parttitle{}
\let\origpart\part%alten pert-Befehl behalten
\renewcommand*{\part}[2][]{%
   \ifnum\value{part}=0\else\clearpage\fi%at first part no \clearpage
   \vspace*{-9mm}%Remove vertical space before part-title
   \origpart{#2}%
   \renewcommand*\parttitle{#2}%
}
```
### Nummerierung
Um die Nummerierung anzupassen, müssen die Befehle überschrieben werden:
```
\renewcommand{\thepart}{\Alph{part}}
\renewcommand{\thesection}{\Roman{section}}
\renewcommand{\thesubsection}{\arabic{subsection}}
\renewcommand{\thesubsubsection}{\alph{subsubsection})}
\renewcommand{\theparagraph}{\alph{subsubsection}\alph{paragraph})}
\renewcommand{\thesubparagraph}{(\arabic{subparagraph})}
%Section-Zähler in jedem \part reseten
\makeatletter
\@addtoreset{section}{part}
\makeatother  
```
### Abstände
Für jede Ebene wird der Abstand vor und nach der Überschrift definiert:
```
\usepackage[noindentafter]{titlesec}
\def\beforeheading{12pt}%Abstand vor allen Überschriften
\def\afterheading{6pt}%Abstand nach allen Überschriften
\titlespacing{\part}{0pt}{0pt}{\afterheading}
\titlespacing{\section}{0pt}{\beforeheading}{\afterheading}
\titlespacing{\subsection}{0pt}{\beforeheading}{\afterheading}
\titlespacing{\subsubsection}{0pt}{\beforeheading}{\afterheading}
\titlespacing{\paragraph}{0pt}{\beforeheading}{\afterheading}
\titlespacing{\subparagraph}{0pt}{\beforeheading}{\afterheading}
```
Beim `\part` wird kein Abstand davor gelassen, da dabei immer eine neue Seite begonnen wird.
Die Abstände der Überschriften zur Nummerierung kann auch gesetzt werden:
```
%Format der Überschriften
\def\numbertitlespace{0.5em}%Abstand zwischen Nummerierung und Titel
\titleformat{\part}{\Large\mdseries}{\thepart}{\numbertitlespace}{}
\titleformat{\section}{\large\mdseries}{\thesection}{\numbertitlespace}{}
\titleformat{\subsection}{\large\mdseries}{\thesubsection}{\numbertitlespace}{}
\titleformat{\subsubsection}{\large\mdseries}{\thesubsubsection}{\numbertitlespace}{}
\titleformat{\paragraph}{\large\mdseries}{\theparagraph}{\numbertitlespace}{}
\titleformat{\subparagraph}{\large\mdseries}{\thesubparagraph}{\numbertitlespace}{}
```
## Inhaltsverzeichnis
Standardmäßig wird im ToC keine gepunktete Linie für PArt und Section angezeigt. Um das anzupassen:
```
%Gepunktete Linie im ToC auch bei Part und Section
\usepackage{tocloft}
\renewcommand{\cftpartdotsep}{\cftdotsep}
\renewcommand{\cftpartleader}{\normalfont\cftdotfill{\cftpartdotsep}}%gepunktete Linie bei Part nicht fett
\renewcommand{\cftsecdotsep}{\cftdotsep}
\renewcommand{\cftsecleader}{\normalfont\cftdotfill{\cftsecdotsep}}%gepunktete Linie bei Section nicht fett
%Part und Section im ToC nicht fett
\renewcommand{\cftsecfont}{\mdseries}
\renewcommand{\cftsecpagefont}{\mdseries}
\renewcommand{\cftpartfont}{\mdseries}
\renewcommand{\cftpartpagefont}{\mdseries}
```
Die Linie soll auch feiner sein: ``\renewcommand{\cftdotsep}{0.5}``
Damit die Linien bis zur Seitenzahl gehen, muss im Dokument selbst anstatt nur des ToC-Befehls folgendes geschrieben werden:
```
{\def\makebox[#1][#2]#3{#3}%
	\tableofcontents
}
```
Das ToC soll acuh bis Ebene 6 gehen:``\setcounter{tocdepth}{6}``
### Abstände und Einschübe
Die Einschübe der Ebenen entsprechen den summierten Abständen, sodass die Nummerierung von Ebene 2 auf der X-Achse an der gleichen Stelle beginnt, wie die Überschrift von Ebene 1:
```
%Abstände Nummer-Überschrift im TOC
\def\secnumwidth{20pt}
\setlength{\cftpartnumwidth}{\secnumwidth}
\setlength{\cftsecnumwidth}{\secnumwidth}
\setlength{\cftsubsecnumwidth}{\secnumwidth}
\setlength{\cftsubsubsecnumwidth}{\secnumwidth}
\setlength{\cftparanumwidth}{\secnumwidth}
\setlength{\cftsubparanumwidth}{\secnumwidth}

%Einschub der Abschnitts-Überschriften im ToC
\setlength{\cftsecindent}{20pt}
\setlength{\cftsubsecindent}{40pt}
\setlength{\cftsubsubsecindent}{60pt}
\setlength{\cftparaindent}{80pt}
\setlength{\cftsubparaindent}{100pt}
```
Es werden zudem die standardmäßig größeren Abstände vor PArt und Section entfernt:
```
\setlength{\cftbeforepartskip}{0cm}%Für Part
\setlength{\cftbeforesecskip}{0pt}%für Section
```
