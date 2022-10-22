/// <reference types="cypress" />

import {VisitUrl} from "../../helpers/Browser";
import * as AppAssertions from "../../helpers/AppAssertions.js";
import * as AppActions from "../../helpers/AppActions.js";
import * as ProjectAssertions from "../../helpers/ProjectsPageAssertions.js";

describe('Creating project', () => {

    describe('from info-page', () => {
        before(()=>{
            VisitUrl('#/projects')
        });
        it('opening dialog', () => {
            AppActions.ClickSidebarAdd();
            AppAssertions.AssertNewDialogIsOpen('Neues Projekt erstellen');
        });
        describe('reopening', () => {
            it('from valid', () => {
                AppActions.TypeInNew('testName')
                AppActions.ClickOverlay();
                AppActions.ClickSidebarAdd();
                AppAssertions.AssertNewDialogValueIs('');
            })
            it('from invalid', () => {
                AppActions.TypeInNew('test Name')
                AppActions.ClickOverlay();
                AppActions.ClickSidebarAdd();
                AppAssertions.AssertNewDialogValueIs('');
            })
        })
        describe('saveDisabled', () => {
            it('initially disabled', () => {
                AppAssertions.AssertNewDialogSaveEnabled(false);
            })
            it('type valid name', () => {
                AppActions.TypeInNew('testName')
                AppAssertions.AssertNewDialogValueIs('testName');
                AppAssertions.AssertNewDialogSaveEnabled(true);
            })
            it('type invalid name', () => {
                AppActions.TypeInNew('test Name')
                AppAssertions.AssertNewDialogSaveEnabled(false);
                AppActions.ClickOverlay();
            })
        })
        describe('actually saving', () => {
            it('save project', () => {
                AppActions.ClickSidebarAdd();
                AppActions.TypeInNew('testName');
                AppActions.NewDialogSaveClick();
                AppAssertions.AssertUrlHashIs('#/projects/testName')
                AppAssertions.AssertSidebarInfoBtnNotDisabled();
                ProjectAssertions.AssertOverviewTitleIs('testName');
            })
            it('save second project', () => {
                AppActions.ClickSidebarAdd();
                AppActions.TypeInNew('testName2');
                AppActions.NewDialogSaveClick();
                AppAssertions.AssertUrlHashIs('#/projects/testName2')
                AppAssertions.AssertSidebarInfoBtnNotDisabled();
                ProjectAssertions.AssertOverviewTitleIs('testName2');
            })
            it('switch back to first project', () => {
                AppActions.ClickSidebarItem(0)
                AppAssertions.AssertUrlHashIs('#/projects/testName')
                AppAssertions.AssertSidebarInfoBtnNotDisabled();
                ProjectAssertions.AssertOverviewTitleIs('testName');
                AppActions.ClickSidebarItem(1)
                AppAssertions.AssertUrlHashIs('#/projects/testName2')
                AppAssertions.AssertSidebarInfoBtnNotDisabled();
                ProjectAssertions.AssertOverviewTitleIs('testName2');
                AppActions.ClickSidebarInfo();
                AppAssertions.AssertSidebarInfoBtnDisabled()
            })
        })
    })

})