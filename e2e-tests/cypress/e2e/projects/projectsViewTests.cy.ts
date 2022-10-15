/// <reference types="cypress" />

import {VisitUrl} from "../../helpers/Browser";
import * as ProjectPageAssertions from "../../helpers/ProjectsPageAssertions.js"
import * as AppAssertions from "../../helpers/AppAssertions.js";
import * as AppActions from "../../helpers/AppActions.js";

describe('projectsView', ()=> {
    before(() => {
        VisitUrl('#/projects')
    });

    describe('display info', ()=> {
        it('middle shows projects-info', () => {
            ProjectPageAssertions.AssertPage1ContainsElements(2)
        });

        it('sidebar-info-btn is disabled', () => {
            AppAssertions.AssertSidebarInfoBtnDisabled()
        })
    });

    describe('switch to project and back to home', () => {
        before(()=> {
            AppActions.ClickSidebarItem(0);
        })

        it('sidebar-info-btn is not disabled', () => {
            AppAssertions.AssertSidebarInfoBtnNotDisabled()
        })

        it('after click on info info-btn is disabled', () => {
            AppActions.ClickSidebarInfo();
            AppAssertions.AssertSidebarInfoBtnDisabled();
            ProjectPageAssertions.AssertPage1ContainsElements(2)
        })
    })
})
