<!-- DO NOT REMOVE/CLEAN UP THE LINE BREAKS IN THIS DOCUMENT!
     These are intentional to create the necessary reveals.js page hierarchy.

        - Two following new lines (\n\n) create a vertical slide.
        - Three following new lines (\n\n\n) create a horizontal slide.

     see https://github.com/hakimel/reveal.js/blob/0b3e7839ebf4ed8b6c180aca0abafa28c67aee6d/plugin/markdown/example.html#L21
-->

# ThesorTeX
### Bibliography projects



## Motivation
### Why all of this?


#### MS-Word

MS-Word can lead to a lot of frustration, when dealing with a clean layout.
Over the course of my studying I build a LaTeX-template for homeworks and my bachelor thesis.


#### Inflexibility of BibLaTeX

LaTeX has its own system for bibliogrpahy, BibLaTeX.
But individual changes are complicated.
Therefore I build my own system.



### Template


#### Styling

- Header and footer
- Table of contents/figures/tables
- Codes
- Figures and tables


#### Abbreviations

The abbreviations are read from abkuerzungen.csv.
```
abk;bed;
CSV;Comma separated values;
...
```


#### Bibliography

Then bibliography entries are also read from a csv-file. They are passed to a command depending on the type.
```
key;type;a;b;c;d;...
entry1;book;Thomson, John;1987;London;...
...
```



### Webclient
Entering all the values into the csv-file is complicated.
Therefore I build a webclient to do that.
This is where you are right now.


#### Projekt anlegen

Klicke auf das <i>+</i> oben links und gebe einen Namen für dein neues Projekt ein.
Es wird ein Ordner unter <i>projects/Dein_Projektname</i> erstellt.


#### Eintrag hinzufügen

Klicke auf das <i>+</i> unter Literatureinträge.
Vergebe einen Schlüssel und wähle eine Kategorie aus.
Jetzt kannst du die Attribute eintragen.


#### Literatur-Kategorie bearbeiten

Klicke auf das <i>+</i> unter Kategorien.
Vergebe einen Namen und konfiguriere ggf. einen Citavi-Import.
Nun kannst du Attribute im Literaturverzeichnis und in Zitaten hinzufügen und nach belieben stylen.



### Learning by doing!


Look into the documentation, if you have questions or problems.
Just try out this tool and see, if it is right for you ;)
