import {VisitUrl} from "../../helpers/Browser";
import * as ProjectActions from "../../helpers/ProjectsPageActions";
import * as ProjectAssertions from "../../helpers/ProjectsPageAssertions";
import * as EditorAssertions from "../../helpers/EditorAssertions";
import * as EditorActions from "../../helpers/EditorActions";

describe('opening editor', () => {
    it('opening editor', () => {
        VisitUrl('#/projects/testName3')
        ProjectActions.ClickOnNewEntry();
        ProjectAssertions.EditAreaIsVisible();
        EditorAssertions.AssertEditorSaveBtnIsEnabled(false);
    });
    it('entering values', () => {
        EditorActions.TypeInField('Neuer Schlüssel', 'test1')
        EditorActions.TypeInField('Kategorie', 'citaviBook')
        EditorActions.TypeInField('Autor', 'Hans Peter Hummelmann')
        EditorAssertions.AssertEditorSaveBtnIsEnabled(true);
    });
    it('saving', () => {
        EditorActions.ClickEditorSaveBtn();
        EditorAssertions.AssertEditorSaveBtnIsEnabled(false);
        ProjectAssertions.AssertCategoryForEntryIs('test1', 'citaviBook')
    });
});