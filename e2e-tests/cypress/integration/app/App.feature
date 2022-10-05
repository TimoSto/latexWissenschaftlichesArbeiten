#language: de
  Funktionalität: App laden
    
    Szenario: App laden
      Angenommen die App wurde mit dem Hash '#/' aufgerufen
      Dann wird die Startseite mit 4 Cards angezeigt
      Und sind 0 btns in der toolbar

    Szenario: Wechsel zu documentation-projekt
      Angenommen die App wurde mit dem Hash '#/' aufgerufen
      Dann existiert ein Projekt mit dem Namen 'documentation'
      Wenn zum Projekt 'documentation' gewechselt wird
      Dann sind 3 btns in der toolbar
      Und ist der Titel des mittleren Bereiches 'documentation'