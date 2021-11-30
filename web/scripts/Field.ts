
export default class Field {
    Field: string;
    Style: string;
    Prefix: string;
    Suffix: string;

    constructor(f: string, s: string, p:string, suf:string) {
        this.Field = f;
        this.Style = s;
        this.Prefix = p;
        this.Suffix = suf;
    }
}