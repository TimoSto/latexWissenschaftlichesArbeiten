/// <reference types="cypress" />

import {VisitUrl} from "../../helpers/Browser";
import * as ProjectPageAssertions from "../../helpers/ProjectsPageAssertions.js"
import * as AppAssertions from "../../helpers/AppAssertions.js";
import * as AppActions from "../../helpers/AppActions.js";

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
            AppAssertions.AssertUrlHashIs('#/projects/test')
        })
    })
})
