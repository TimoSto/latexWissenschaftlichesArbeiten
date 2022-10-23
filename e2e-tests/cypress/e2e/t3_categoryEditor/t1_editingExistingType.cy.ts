/// <reference types="cypress" />

import {VisitUrl} from "../../helpers/Browser";
import * as AppActions from "../../helpers/AppActions";
import * as ProjectAssertions from "../../helpers/ProjectsPageAssertions";
import * as ProjectActions from "../../helpers/ProjectsPageActions";
import * as CategoryEditorActions from "../../helpers/CategoryPageActions";
import * as CategoryPageAssertions from "../../helpers/CategoryPageAssertions";
import * as EditorAssertions from "../../helpers/EditorAssertions";
import * as EditorActions from "../../helpers/EditorActions";

describe('editing existing type', () => {

    describe('save-btn enabled/disabled', () => {
        it('opening editor', () => {
            VisitUrl('#/projects')
            AppActions.ClickSidebarAdd();
            AppActions.TypeInNew('testName3');
            AppActions.NewDialogSaveClick();
            ProjectActions.ClickOnTableElement('aufsatz');
            ProjectAssertions.EditAreaIsVisible();
            EditorAssertions.AssertEditorSaveBtnIsEnabled(false);
        });
        it('change category-name', () => {
            EditorActions.TypeInField('Neue Bezeichnung', 'test');
            EditorAssertions.AssertEditorSaveBtnIsEnabled(true);
            CategoryEditorActions.ClearField('Neue Bezeichnung');
            //TODO: hier muss auch disabled sein
            EditorActions.TypeInField('Neue Bezeichnung', 'aufsatz');
            EditorAssertions.AssertEditorSaveBtnIsEnabled(false);
        });
        it('change citavi-category', () => {
            EditorActions.TypeInField('Citavi-Kategorie', 'article');
            EditorAssertions.AssertEditorSaveBtnIsEnabled(true);
            CategoryEditorActions.ClearField('Citavi-Kategorie');
            EditorAssertions.AssertEditorSaveBtnIsEnabled(false);
        });
        it('change citavi-necessary fields', () => {
            EditorActions.TypeInField('Citavi-Pflichtfelder', 'doi');
            EditorAssertions.AssertEditorSaveBtnIsEnabled(true);
            CategoryEditorActions.ClearField('Citavi-Pflichtfelder');
            EditorAssertions.AssertEditorSaveBtnIsEnabled(false);
        });
        it('change attribute in bib', () => {
            //TODO saveNecessar auslagern und dann unittesten
            CategoryEditorActions.TypeInNthFieldWithName('Attribut', 0, "tt");
            EditorAssertions.AssertEditorSaveBtnIsEnabled(true);
            CategoryEditorActions.ClearNthFieldWithName('Attribut', 0);
            EditorAssertions.AssertEditorSaveBtnIsEnabled(true);//TODO: sollte false sein, wenn attributname leer => über rules testen
            CategoryEditorActions.TypeInNthFieldWithName('Attribut', 0, "Autor");
            EditorAssertions.AssertEditorSaveBtnIsEnabled(false);
        })
    });

    describe('Models', () => {
        it('typing in bibfield', () => {
            CategoryEditorActions.TypeInNthFieldWithName('Attribut', 0, "tt");
            EditorAssertions.AssertEditorSaveBtnIsEnabled(true);
            CategoryPageAssertions.AssertBibModelIs("<i>Autortt</i> (Jahr). Titel. In: <i>Zeitschrift</i> Ausgabe, S. Seiten, url");
        })
    })

    describe('actually saving', () => {
        it('saving', () => {
            EditorActions.ClickEditorSaveBtn();
            EditorAssertions.AssertEditorSaveBtnIsEnabled(false);
            ProjectAssertions.AssertBibModelForTypeIs('aufsatz', "<i>Autortt</i> (Jahr). Titel. In: <i>Zeitschrift</i> Ausgabe, S. Seiten, url")
        })
    })

    describe('citavi stuff', () => {
       it('changing category', () => {
           EditorActions.TypeInField('Citavi-Kategorie', 'article');
           EditorActions.ClickEditorSaveBtn();
           ProjectAssertions.AssertCitaviCategoryForTypeIs('aufsatz', 'article');
       })
    })
})