<!-- DO NOT REMOVE/CLEAN UP THE LINE BREAKS IN THIS DOCUMENT!
     These are intentional to create the necessary reveals.js page hierarchy.

        - Two following new lines (\n\n) create a vertical slide.
        - Three following new lines (\n\n\n) create a horizontal slide.

     see https://github.com/hakimel/reveal.js/blob/0b3e7839ebf4ed8b6c180aca0abafa28c67aee6d/plugin/markdown/example.html#L21
-->

# ThesorTeX
### Literaturprojekte



## Motivation
### Warum das ganze?


#### MS-Word

MS-Word hat in meinen Augen ein hohes Frustrationspotential, wenn es um eine saubere Formatierung geht.
Während meines Studiums hab ich mir deshalb nach und nach eine LaTeX-Vorlage für Hausarbeiten und im Endeffekt meine Bachelorarbeit aufgebaut.


#### Unflexibilität von BibLaTeX

LaTeX hat ein eigenes System für Literatur und Zitate, BibLaTeX. Allerdings fand ich Anpassungen und ein individuelles Styling darin sehr unhandlich.
Deshalb hab ich mir ein eigenes Literatur-Paket gebaut.



### Vorlage


#### Allgemeines Styling

- Kopf- und Fußzeilen
- Verzeichnisse
- Codeausschnitte
- Bilder und Tabellen


#### Abkürzungen

Die Abkürzungen werden aus der abkuerzungen.csv ausgelesen.
```
abk;bed;
CSV;Comma separated values;
...
```


#### Literatur

Die Literatureinträge werden ebenfalls aus einer CSV-Datei ausgelesen. Die Werte werden dann an den der Kategorie zugehörigen Befehl übergeben.
```
key;type;a;b;c;d;...
entry1;book;Thomson, John;1987;London;...
...
```



### Webclient
Das Eintragen in die CSV ist allerdings sehr mühselig, deshalb gibt es eine WEboberfläche, über welche die Literatur gemanaged werden kann.
Dort befindest du dich gerade.


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


Schau bei Fragen oder Unklarheiten in die Dokumentation.
Probier es einfach mal aus und schaue, ob dieses Tool das richtige für dich ist ;)
