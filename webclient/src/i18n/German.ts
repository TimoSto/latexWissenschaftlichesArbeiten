import {TranslationKeys} from "@/i18n/Keys";

export const GermanTranslations: TranslationKeys = {
    Common: {
        Discard: 'Abbrechen',
        Save: 'Speichern'
    },
    App: {
        TitleAppendixProjects: 'Projekte',
        Information: 'Informationen',
        Homepage: 'Startseite'
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
        }
    },
    Config: {
        Title: 'Globale Konfigurationen',
        DarkMode: 'Dunkles Design verwenden',
        AutoOpen: 'Beim Starten der Anwendung den Browser öffnen'
    }
}