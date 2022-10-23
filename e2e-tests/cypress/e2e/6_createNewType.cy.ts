import * as ProjectActions from "../helpers/ProjectsPageActions";
import * as CategoryPageAssertions from "../helpers/CategoryPageAssertions";
import * as CategoryEditorActions from "../helpers/CategoryPageActions";
import * as ProjectAssertions from "../helpers/ProjectsPageAssertions";
import {VisitUrl} from "../helpers/Browser";
import * as EditorActions from "../helpers/EditorActions";
import * as EditorAssertions from "../helpers/EditorAssertions";

describe('creating new type', () => {
    before(() => {
        VisitUrl('#/projects/testName3')
        ProjectActions.ClickOnNewType();
    });

    it('is initially disabled', () => {

    })

    it('type in name', () => {
        CategoryPageAssertions.AssertInitialNameIs('');
        CategoryEditorActions.ClearField('Neue Bezeichnung')
        EditorActions.TypeInField('Neue Bezeichnung', 'test');
        EditorAssertions.AssertEditorSaveBtnIsEnabled(true);
    })

    it('add attribute', () => {
        CategoryEditorActions.AddAttributeToBib();
        CategoryEditorActions.TypeInNthFieldWithName('Attribut', 0, 'teest')
    })

    it('saving', () => {
        EditorActions.ClickEditorSaveBtn();
        EditorAssertions.AssertEditorSaveBtnIsEnabled(false);
        ProjectAssertions.AssertBibModelForTypeIs('test', "teest");
        CategoryPageAssertions.AssertInitialNameIs('test');
    });


})