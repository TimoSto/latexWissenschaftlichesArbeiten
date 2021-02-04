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
