/// <reference types="cypress" />

import {VisitUrl} from "../../helpers/Browser";
import * as AppAssertions from "../../helpers/AppAssertions.js";
import * as AppActions from "../../helpers/AppActions.js";

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
            })
        })
    })

})