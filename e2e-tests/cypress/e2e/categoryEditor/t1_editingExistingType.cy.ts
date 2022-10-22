/// <reference types="cypress" />

import {VisitUrl} from "../../helpers/Browser";
import * as AppAssertions from "../../helpers/AppAssertions.js";
import * as AppActions from "../../helpers/AppActions.js";
import * as ProjectAssertions from "../../helpers/ProjectsPageAssertions.js";
import * as ProjectActions from "../../helpers/ProjectsPageActions.js";
import * as CategoryEditorActions from "../../helpers/CategoryPageActions";
import * as CategoryPageAssertions from "../../helpers/CategoryPageAssertions";
import {AssertBibModelIs} from "../../helpers/CategoryPageAssertions";

describe('editing existing type', () => {

    describe('save-btn enabled/disabled', () => {
        it('opening editor', () => {
            VisitUrl('#/projects')
            AppActions.ClickSidebarAdd();
            AppActions.TypeInNew('testName');
            AppActions.NewDialogSaveClick();
            ProjectActions.ClickOnTableElement('aufsatz');
            ProjectAssertions.EditAreaIsVisible();
            CategoryPageAssertions.AssertCategorySaveBtnIsEnabled(false);
        });
        it('change category-name', () => {
            CategoryEditorActions.TypeInField('Neue Bezeichnung', 'test');
            CategoryPageAssertions.AssertCategorySaveBtnIsEnabled(true);
            CategoryEditorActions.ClearField('Neue Bezeichnung');
            //TODO: hier muss auch disabled sein
            CategoryEditorActions.TypeInField('Neue Bezeichnung', 'aufsatz');
            CategoryPageAssertions.AssertCategorySaveBtnIsEnabled(false);
        });
        it('change citavi-category', () => {
            CategoryEditorActions.TypeInField('Citavi-Kategorie', 'article');
            CategoryPageAssertions.AssertCategorySaveBtnIsEnabled(true);
            CategoryEditorActions.ClearField('Citavi-Kategorie');
            CategoryPageAssertions.AssertCategorySaveBtnIsEnabled(false);
        });
        it('change citavi-necessary fields', () => {
            CategoryEditorActions.TypeInField('Citavi-Pflichtfelder', 'doi');
            CategoryPageAssertions.AssertCategorySaveBtnIsEnabled(true);
            CategoryEditorActions.ClearField('Citavi-Pflichtfelder');
            CategoryPageAssertions.AssertCategorySaveBtnIsEnabled(false);
        });
        it('change attribute in bib', () => {
            //TODO saveNecessar auslagern und dann unittesten
            CategoryEditorActions.TypeInNthFieldWithName('Attribut', 0, "tt");
            CategoryPageAssertions.AssertCategorySaveBtnIsEnabled(true);
            CategoryEditorActions.ClearNthFieldWithName('Attribut', 0);
            CategoryPageAssertions.AssertCategorySaveBtnIsEnabled(true);//TODO: sollte false sein, wenn attributname leer => über rules testen
            CategoryEditorActions.TypeInNthFieldWithName('Attribut', 0, "Autor");
            CategoryPageAssertions.AssertCategorySaveBtnIsEnabled(false);
        })
    });

    describe('Models', () => {
        it('typing in bibfield', () => {
            CategoryEditorActions.TypeInNthFieldWithName('Attribut', 0, "tt");
            CategoryPageAssertions.AssertCategorySaveBtnIsEnabled(true);
            CategoryPageAssertions.AssertBibModelIs("<i>Autortt</i> (Jahr). Titel. In: <i>Zeitschrift</i> Ausgabe, S. Seiten, url");
        })
    })

    describe('actually saving', () => {
        it('saving', () => {
            CategoryEditorActions.ClickCategorySaveBtn();
            CategoryPageAssertions.AssertCategorySaveBtnIsEnabled(false);
            ProjectAssertions.AssertBibModelForTypeIs('aufsatz', "<i>Autortt</i> (Jahr). Titel. In: <i>Zeitschrift</i> Ausgabe, S. Seiten, url")
        })
    })

    describe('creating new type', () => {
        before(() => {
            ProjectActions.ClickOnNewType();
        });

        it('is initially disabled', () => {

        })

        it('type in name', () => {
            CategoryEditorActions.ClearField('Neue Bezeichnung')
            CategoryEditorActions.TypeInField('Neue Bezeichnung', 'test');
            CategoryPageAssertions.AssertCategorySaveBtnIsEnabled(true);
        })

        it('add attribute', () => {
            CategoryEditorActions.AddAttributeToBib();
            CategoryEditorActions.TypeInNthFieldWithName('Attribut', 0, 'teest')
        })

        it('saving', () => {
            CategoryEditorActions.ClickCategorySaveBtn();
            CategoryPageAssertions.AssertCategorySaveBtnIsEnabled(true);
            ProjectAssertions.AssertBibModelForTypeIs('test', "teest")
        })
    })
})