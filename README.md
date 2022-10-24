# ThesorTeX

Dieses Tool unterstützt dich in Berührungspunkten mit LaTeX, denen du auf deinem akademischen und beruflichen Weg begegnen könntest:
- Formatierungsvorlage für eine Arbeit mit wissenschaftlichem Anspruch
- Weboberfläche, über die du Literatureinträge hinzufügen kannst
- Weboberfläche, über die du Literaturtypen definieren und bearbeiten kannst
- Eine Vorlage für einen Lebenslauf

## Downloads
Lade die für dein Betriebssystem passende Datei herunter:
- Für Windows: out/windows/ThesorTeX.exe
- Für Linux: out/linux/ThesorTeX
- Für MacOS: out/macOS_amd64/ThesorTeX
- Für MacOS (M1): out/macOS_arm64/ThesorTeX
Kopiere diese an einen Ort deiner Wahl und starte die Anwendung durch einen Doppelklick. Ggf. musst du der Anwendung vertrauen und einen Zugriff auf dein Netzwerk zulassen.

## Projektstruktur

- cmd: Einstiegspunkt
- internal: Backend-Logik
- pkg: Allgemeines
- e2e-tests: End-2-End-Tests
- webclient: Vue-Webprojekt
- tools: tools, die während des Builds genutzt werden

## Testing
Dieses Projekt soll weitesgehend nach TDD entwickelt werden
### Backend-Unit-Tests
Einzelne Funktionen im Backend werden über go getestet
### Frontend-Unit-Tests
Funktionen im Frontend werden über Jest getestet
### End-2-End-Tests
End-2-End-Tests werden über cypress ausgeführt
