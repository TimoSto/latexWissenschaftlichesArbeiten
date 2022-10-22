/// <reference types="cypress" />

import {VisitUrl} from "../../helpers/Browser";
import * as AppAssertions from "../../helpers/AppAssertions.js";
import * as AppActions from "../../helpers/AppActions.js";
import * as ProjectAssertions from "../../helpers/ProjectsPageAssertions.js";
import * as ProjectActions from "../../helpers/ProjectsPageActions.js";

describe('editing existing type', () => {
    before(() => {
        VisitUrl('#/projects')
        AppActions.ClickSidebarAdd();
        AppActions.TypeInNew('testName');
        AppActions.NewDialogSaveClick();
    })

    it('editing aufsatz', () => {
        ProjectActions.ClickOnTableElement('aufsatz');
        ProjectAssertions.EditAreaIsVisible();
    })
})