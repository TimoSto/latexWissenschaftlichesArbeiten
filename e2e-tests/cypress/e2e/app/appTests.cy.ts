/// <reference types="cypress" />

import {VisitUrl} from "../../helpers/Browser";
import * as App from "../../helpers/AppAssertions.js";

describe('Global app-stuff', ()=> {
    describe('on home-page', () => {
        beforeEach(()=> {
            VisitUrl('/#/');
        });

        it('Title is "ThesorTeX"', ()=> {
            App.AssertTopAppBarHasText('ThesorTeX');
        });

        it('Sidebar is disabled', () => {
            App.AssertNavIconIsDisabled();
        });

        it('Sidebar is closed', () => {
            App.AssertSidebarClosed();
        })

        it('Sidebar is empty', () => {
            App.AssertSidebarEmpty();
        })
    })

    describe('on projects-page', () => {
        beforeEach(()=> {
            VisitUrl('/#/projects');
        });

        it('Title is "ThesorTeX - Projekte"', ()=> {
            App.AssertTopAppBarHasText('ThesorTeX - Projekte');
        });

        it('Sidebar is not disabled', () => {
            App.AssertNavIconIsNotDisabled();
        });

        it('Sidebar is closed', () => {
            App.AssertSidebarClosed();
        })

        it('Sidebar is not empty', () => {
            App.AssertSidebarNotEmpty();
        })
    })

})