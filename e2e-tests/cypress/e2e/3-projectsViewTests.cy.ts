/// <reference types="cypress" />

import {VisitUrl} from "../helpers/Browser";
import * as ProjectPageAssertions from "../helpers/ProjectsPageAssertions"
import * as AppAssertions from "../helpers/AppAssertions";
import * as AppActions from "../helpers/AppActions";
import {ClickOnTableElement} from "../helpers/ProjectsPageActions";
import * as EditorActions from "../helpers/EditorActions";
import * as EditorAssertions from "../helpers/EditorAssertions";

describe('projectsView', ()=> {
    before(() => {
        VisitUrl('#/projects')
    });

    describe('Sidebar', () => {
        it('display info', ()=> {
            ProjectPageAssertions.AssertPage1Contains('#projectInfoPage')

            AppAssertions.AssertSidebarInfoBtnDisabled()
        });

        it('switch to project and back to home', () => {
            AppActions.ClickSidebarItem(0);

            AppAssertions.AssertSidebarInfoBtnNotDisabled()

            ProjectPageAssertions.AssertPage1Contains('#projectOverviewPage')

            AppActions.ClickSidebarInfo();
            AppAssertions.AssertSidebarInfoBtnDisabled();
            ProjectPageAssertions.AssertPage1Contains('#projectInfoPage')
        });

        it('after reload', () => {
            AppActions.ClickSidebarItem(0);

            cy.reload(true);

            AppAssertions.AssertSidebarInfoBtnNotDisabled();
        })
    });

    describe('URL', () => {
        before(() => {
            VisitUrl('#/projects')
        });

        it('on info page', () => {
            AppAssertions.AssertUrlHashIs('#/projects')
        });

        it('after switch to test', () => {
            AppActions.ClickSidebarItem(0);
            AppAssertions.AssertUrlHashIs('#/projects/testName');
        })

        it('after reload', () => {
            cy.reload();
            AppAssertions.AssertUrlHashIs('#/projects/testName');
        })
    });

    describe('interruptNavigation (category-editor)', () => {
       describe('home-navigation', () => {
           before(() => {
               VisitUrl('#/projects/testName');
               ClickOnTableElement('aufsatz');
               EditorActions.TypeInField('Neue Bezeichnung', 'test');
           })
           it('should interrupt', () => {
               AppActions.ClickHomeBtn();
               AppAssertions.AssertInterruptDialogIsShown();
           })
           it('when clicked on abort, it stays', () => {
               AppActions.ClickInDialog('.v-btn', 0)
               AppAssertions.AssertUrlHashIs('#/projects/testName')
           })
           it('when clicked on continue, it continues', () => {
               AppActions.ClickHomeBtn();
               AppAssertions.AssertInterruptDialogIsShown();
               AppActions.ClickInDialog('.v-btn', 1)
               AppAssertions.AssertUrlHashIs('#/')
           })
       })
        describe('project switch', () => {
            before(() => {
                VisitUrl('#/projects/testName');
                ClickOnTableElement('aufsatz');
                EditorActions.TypeInField('Neue Bezeichnung', 'test');
            })
            it('should interrupt', () => {
                AppActions.ClickSidebarItem(1);
                AppAssertions.AssertInterruptDialogIsShown();
            })
            it('when clicked on abort, it stays', () => {
                AppActions.ClickInDialog('.v-btn', 0)
                AppAssertions.AssertUrlHashIs('#/projects/testName')
            })
            it('when clicked on continue, it continues', () => {
                AppActions.ClickSidebarItem(1);
                AppAssertions.AssertInterruptDialogIsShown();
                AppActions.ClickInDialog('.v-btn', 1)
                AppAssertions.AssertUrlHashIs('#/projects/testName2')
            })
        });
        describe('editor close', () => {
            before(() => {
                VisitUrl('#/projects/testName');
                ClickOnTableElement('aufsatz');
                EditorActions.TypeInField('Neue Bezeichnung', 'test');
            })
            it('should interrupt', () => {
                EditorActions.ClickEditorCloseBtn();
                AppAssertions.AssertInterruptDialogIsShown();
            })
            it('when clicked on abort, it stays', () => {
                AppActions.ClickInDialog('.v-btn', 0)
                EditorAssertions.AssertEditorSaveBtnIsEnabled(true)
            })
            it('when clicked on continue, it continues', () => {
                EditorActions.ClickEditorCloseBtn();
                AppAssertions.AssertInterruptDialogIsShown();
                AppActions.ClickInDialog('.v-btn', 1)
                EditorAssertions.AssertEditorIsNotShown()
            })
        });
    });
})
