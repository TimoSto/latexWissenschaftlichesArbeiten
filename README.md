# ThesorTeX

Dieses Tool unterstützt dich in Berührungspunkten mit LaTeX, denen du auf deinem akademischen und beruflichen Weg begegnen könntest:
- Formatierungsvorlage für eine Arbeit mit wissenschaftlichem Anspruch
- Weboberfläche, über die du Literatureinträge hinzufügen kannst
- Weboberfläche, über die du Literaturtypen definieren und bearbeiten kannst
- Eine Vorlage für einen Lebenslauf

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
### Integrationstests
tdb.
