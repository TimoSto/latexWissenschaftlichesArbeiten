
export default class PresentationModel {

    private _mainResource: string;//URL

    private _history: string[] = [];//Alle URLs

    set MainResource(uri: string) {
        this._mainResource = uri;

        this._history.push(uri);
    }

    get MainResource(): string {
        return this._mainResource;
    }

    get Histroy(): string[]{
        return this._history;
    }

    RemoveLatestHistoryEntry() {
        this._history.pop();
    }
}