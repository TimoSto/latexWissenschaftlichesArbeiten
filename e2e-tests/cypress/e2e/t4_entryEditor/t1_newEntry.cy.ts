import {VisitUrl} from "../../helpers/Browser";
import * as ProjectActions from "../../helpers/ProjectsPageActions";
import * as ProjectAssertions from "../../helpers/ProjectsPageAssertions";
import {AssertEditorSaveBtnIsEnabled} from "../../helpers/EditorAssertions";

describe('opening editor', () => {
    it('opening editor', () => {
        VisitUrl('#/projects/testName3')
        ProjectActions.ClickOnNewEntry();
        ProjectAssertions.EditAreaIsVisible();
        AssertEditorSaveBtnIsEnabled(false);
    })
});