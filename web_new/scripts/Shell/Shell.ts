import ShellView from "./ShellView";

export default class Shell {

    private _view: ShellView;
    constructor(view: ShellView) {
        this._view = view;
    }

    NavigateToType(type: string) {
        this._view.NavigateToType(type);
    }

    NavigateToEntry(key: string) {
        this._view.NavigateToEntry(key);
    }

    NavigateToProject(key: string) {
        this._view.NavigateToProject(key);
    }

    ReloadPrevious() {
        this._view.ReloadOverview();
    }
}