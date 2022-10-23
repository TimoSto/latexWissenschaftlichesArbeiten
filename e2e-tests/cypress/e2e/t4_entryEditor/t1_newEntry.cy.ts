import {VisitUrl} from "../../helpers/Browser";
import * as ProjectActions from "../../helpers/ProjectsPageActions";

describe('opening editor', () => {
    it('opening editor', () => {
        VisitUrl('#/projects/testName3')
        ProjectActions.ClickOnNewEntry();
    })
});