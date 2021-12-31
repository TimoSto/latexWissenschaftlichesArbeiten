import Shell from "./Shell";

export default class Lapi {

    private _shell: Shell;

    constructor(shell: Shell) {
        this._shell = shell;
        console.log(shell);
    }

    NavigateToType(type: string) {
        console.log('n')
        this._shell.NavigateToType(type);
    }

    NavigateToEntry(key: string) {
        this._shell.NavigateToEntry(key)
    }

    ReloadOverview() {
        this._shell.ReloadOverview();
    }
}