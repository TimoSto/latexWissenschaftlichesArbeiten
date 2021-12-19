import Shell from "../Shell/Shell";

export default class Lapi {

    private _shell: Shell;

    constructor(shell: Shell) {
        this._shell = shell;
    }

    NavigateToType(type: string) {
        this._shell.NavigateToType(type);
    }

    NavigateToEntry(key: string) {
        this._shell.NavigateToEntry(key)
    }

    NavigateToProject(key: string) {
        this._shell.NavigateToProject(key)
    }

    ReloadOverview() {
        this._shell.ReloadPrevious();
    }
}