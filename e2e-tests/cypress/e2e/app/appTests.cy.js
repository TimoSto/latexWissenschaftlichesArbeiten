/// <reference types="cypress" />

import {VisitUrl} from "../../helpers/Browser";
import {AssertTopAppBarHasText} from "../../helpers/AppAssertions";

describe('Global app-stuff', ()=> {
    beforeEach(()=> {
        VisitUrl('/#/');
    });

    it('Title is "ThesorTeX"', ()=> {
        AssertTopAppBarHasText('ThesorTeX');
    });
})