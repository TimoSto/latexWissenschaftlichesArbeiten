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
            AppAssertions.AssertNewDialogIsOpen('Neue Projekt erstellen');
        })
    })

})