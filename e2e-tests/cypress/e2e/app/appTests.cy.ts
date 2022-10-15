/// <reference types="cypress" />

import {VisitUrl} from "../../helpers/Browser";
import * as AppAsserstions from "../../helpers/AppAssertions.js";
import * as AppActions from "../../helpers/AppActions.js";
import * as HomeActions from "../../helpers/HomeActions.js";

describe('Global app-stuff', ()=> {
    describe('on home-page', () => {
        before(()=> {
            VisitUrl('/#/');
        });

        it('Title is "ThesorTeX"', ()=> {
            AppAsserstions.AssertTopAppBarHasText('ThesorTeX');
        });

        it('Sidebar is disabled', () => {
            AppAsserstions.AssertNavIconIsDisabled();
        });

        it('Sidebar is closed', () => {
            AppAsserstions.AssertSidebarClosed();
        })

        it('Sidebar is empty', () => {
            AppAsserstions.AssertSidebarEmpty();
        })

        it('home-btn is disabled', () => {
            AppAsserstions.AssertHomeBtnIsDisabled();
        })
    })

    describe('on projects-page', () => {
        before(()=> {
            VisitUrl('/#/projects');
        });

        it('Title is "ThesorTeX - Projekte"', ()=> {
            AppAsserstions.AssertTopAppBarHasText('ThesorTeX - Projekte');
        });

        it('Sidebar is not disabled', () => {
            AppAsserstions.AssertNavIconIsNotDisabled();
        });

        it('Sidebar is closed', () => {
            AppAsserstions.AssertSidebarClosed();
        })

        it('Sidebar is not empty', () => {
            AppAsserstions.AssertSidebarNotEmpty();
        })

        it('home-btn is not disabled', () => {
            AppAsserstions.AssertHomeBtnIsNotDisabled();
        })
    });

    describe('switch to projects-page and back to home', ()=> {
        before(()=> {
            VisitUrl('/#/');
        });

        describe('When switched to projects', () => {
            before(() => {
                HomeActions.ClickOnCard(1);
            });

            it('Title is "ThesorTeX - Projekte"', ()=> {
                AppAsserstions.AssertTopAppBarHasText('ThesorTeX - Projekte');
            });

            it('Sidebar is not disabled', () => {
                AppAsserstions.AssertNavIconIsNotDisabled();
            });

            it('Sidebar is closed', () => {
                AppAsserstions.AssertSidebarClosed();
            })

            it('Sidebar is not empty', () => {
                AppAsserstions.AssertSidebarNotEmpty();
            })

            it('home-btn is not disabled', () => {
                AppAsserstions.AssertHomeBtnIsNotDisabled();
            })

            it('url is "#/projects"', () => {
                AppAsserstions.AssertUrlHashIs('#/projects')
            })

            describe('When home is clicked', () => {
                before(() => {
                    AppActions.ClickHomeBtn();
                });

                it('Title is "ThesorTeX"', ()=> {
                    AppAsserstions.AssertTopAppBarHasText('ThesorTeX');
                });

                it('Sidebar is disabled', () => {
                    AppAsserstions.AssertNavIconIsDisabled();
                });

                it('Sidebar is closed', () => {
                    AppAsserstions.AssertSidebarClosed();
                })

                it('Sidebar is empty', () => {
                    AppAsserstions.AssertSidebarEmpty();
                })

                it('home-btn is disabled', () => {
                    AppAsserstions.AssertHomeBtnIsDisabled();
                })

                it('url is "#/"', () => {
                    AppAsserstions.AssertUrlHashIs('#/')
                })
            })
        })
    })

})