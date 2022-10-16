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
        describe('saveDisabled', () => {
            it('initially disabled', () => {
                AppAssertions.AssertNewDialogSaveEnabled(false);
            })
            it('type valid name', () => {
                AppActions.TypeInNew('testName')
                AppAssertions.AssertNewDialogSaveEnabled(true);
            })
            it('type invalid name', () => {
                AppActions.TypeInNew('test Name')
                AppAssertions.AssertNewDialogSaveEnabled(false);
            })
        })
    })

})