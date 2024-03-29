import {TranslationKeys} from "@/i18n/Keys";

export const GermanTranslations: TranslationKeys = {
    Common: {
        Discard: 'Abbrechen',
        Save: 'Speichern',
        Abort: 'Abbrechen',
        Delete: 'Löschen',
        Close: 'Schließen',
        MandatoryField: '*Pflichtfeld',
        Upload: 'Hochladen'
    },
    App: {
        TitleAppendixProjects: 'Projekte',
        Information: 'Informationen',
        Homepage: 'Startseite',
        Layout5050: '50:50-Layout',
        Layout3070: '30:70-Layout'
    },
    Home: {
        Welcome: 'Willkommen bei ThesorTeX!',
        Description: 'Dieses Tool erleichtert den Umgang mit LaTeX in verschiedenen Punkten.',
        TemplateCard: {
            Title: 'Vorlage Projekt',
            Content: 'Die mit diesem Tool gelieferte Vorlage eignet sich für Ausarbeitungen mit wissenschaftlichem Anspruch. Aspekte wie Kopf- und Fußzeile, Inhaltsverzeichnis, Abbildungen, Tabellen und Literatur sowie Zitate sind abgedeckt. Klicke auf dieses Element, um sie herunterzuladen. Schau in die dazugehörige Dokumentation, um mehr zu erfahren.'
        },
        BibCard: {
            Title: 'Projekte',
            Content: 'In der Vorlage wird ein eigenes System für die Literatur genutzt. Darin kannst du selbst auswählen, welche Attribute im Literaturverzeichnis und in Zitaten wie dargestellt werden sollen. Die Einträge kannst du über diese Anwendung hinzufügen. Ein Import aus Citavi kann ebenfalls aktiviert werden. Die Einträge kannst du in deinem TeX-Dokument über einen Befehl zitieren. Schau am besten mal in der Dokumentation unter dem Kapitel <i>Literatur</i>.'
        },
        CVCard: {
            Title: 'Vorlage Lebenslauf',
            Content: 'Wenn du mithilfe dieses Tools eine perfekte Abschlussarbeit geschrieben hast, kannst du hier eine Vorlage für einen Lebenslauf herunterladen und dich für deinen nächsten Job bewerben!'
        },
        ContactCard: {
            Title: 'Kontakt',
            Content: 'Wenn dir eine Funktionalität fehlt oder dir ein Fehler auffällt, lege gern ein Issue im Github-Repository an.'
        },
        ConfigCard: {
            Title: 'Konfiguration',
            Content: 'Allgemeine Einstellungen zur App'
        }
    },
    Projects: {
        Info: {
            Description: 'Ein Projekt beinhaltet die Literatureinträge, Literaturtypen, Abkürzungen, Formattierungen (.sty-Dateinen) und die Texte (.tex-Dateien). Die Literatureinträge, -typen und die Abkürzungen können in dieser Anwendung verwaltet werden. Klicke auf das <i>+</i> um ein neues Projekt zu erstellen.'
        },
        New: {
            Title: 'Neues Projekt erstellen',
            Label: 'Projektname',
            AlreadyExists: 'Name bereits vergeben',
            NoSpaces: 'Keine Leerzeichen im Projektnamen erlaubt',
            Success: 'Projekt erfolgreich erstellt'
        },
        Overview: {
            CreateBackup: 'Backup erstellen',
            CreateBackupSuccess: 'Backup erfolgreich erstellt',
            LoadBackup: 'Backup laden',
            DeleteProject: 'Projekt löschen',
            DeleteProjectDialog: {
                Title: 'Aktuelles Projekt löschen?',
                Content: 'Bist du sicher, dass du das aktuelle Projekt löschen willst? Deine Backups bleiben erhalten.',
                Success: 'Projekt erfolgreich gelöscht'
            },
            ResetDialog: {
                Title: 'Projekt auf Backup zurücksetzen',
                Reset: 'Zurücksetzen',
                Success: 'Projekt erfolgreich auf Backup zurückgesetzt'
            },
            Entries: 'Einträge im Literaturverzeichnis',
            UploadEntries: 'Lade eine aus Citavi exportierte Bib-Datei hoch',
            UploadDialog: {
                Title: 'Einträge hochladen',
                EntriesToUpload: 'Folgende Einträge werden hochgeladen:',
                UnknownEntries: 'Folgende Einträge/Kategorien konnten nicht zugeordnet werden:',
                Override: 'Bestehende Einträge überschreiben',
                Success: 'Einträge erfolgreich hochgeladen'
            },
            EntriesTable: {
                Key: 'Schlüssel',
                Category: 'Kategorie',
                Entry: 'Eintrag Literaturverzeichnis',
                CiteCount: 'Anzahl Zitate'
            },
            Types: 'Kategorien für Einträge',
            TypesTable: {
                Name: 'Kategorie',
                EntryExample: 'Beispiel Literaturverzeichnis',
                CitaviType: 'Citavi-Kategorie'
            }
        },
        CategoryEditor: {
            Title: 'Kategorie bearbeiten',
            Properties: 'Eigenschaften',
            InitialName: 'Bezeichnung',
            Name: 'Neue Bezeichnung',
            CitaviCategory: 'Citavi-Kategorie',
            CitaviNecessaryFields: 'Citavi-Pflichtfelder',
            BibliographyEntry: 'Eintrag im Literaturverzeichnis',
            Cite: 'Zitat',
            Attribute: 'Attribut',
            Style: 'Stil',
            Prefix: 'Prefix',
            Suffix: 'Suffix',
            TeX_Value: 'Nicht escapen',
            Normal: 'normal',
            Italic: 'kursiv',
            Success: 'Kategorie erfolgreich gespeichert',
            DeleteCategoryDialog: {
                Title: 'Literaturkategorie löschen',
                Content: 'Willst du diese Literaturkategorie wirklich löschen? Wenn noch Einträge mit diesem Typen existieren, werden diese nicht mehr richtig dargestellt.',
                Success: 'Kategorie erfolgreich gelöscht'
            },
            Rules: {
                NoSpaces: 'Keine Leerzeichen erlaubt',
                NameNotAvailable: 'Bezeichnung ist bereits vergeben',
                AttributeNotAvailable: 'Attribut existiert bereits'
            }
        },
        EntryEditor: {
            Fields: 'Felder',
            NewKey: 'Neuer Schlüssel',
            Rules:  {
                KeyNotAvailable: 'Schlüssel bereits vergeben'
            },
            Success: 'Eintrag erfolreich gespeichert',
            DeleteEntryDialog: {
                Title: 'Literatureintrag löschen',
                Content: 'Wenn in deinem Dokument noch Zitate mit diesem Eintrag sind, werden sie beim nächsten kompilieren rot hervorgehoben.',
                Success: 'Eintrag erfolgreichg gelöscht'
            },
        }
    },
    Config: {
        Title: 'Globale Konfigurationen',
        DarkMode: 'Dunkles Design verwenden',
        AutoOpen: 'Beim Starten der Anwendung den Browser öffnen',
        Success: 'Konfiugration erfolgreich gespeichert'
    }
}