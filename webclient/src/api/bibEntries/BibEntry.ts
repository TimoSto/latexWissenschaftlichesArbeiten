export type BibEntry = {
    Typ: string,
    Key: string,
    Fields: string[],
    CiteNumber: number,
    BibPreview: string,
    CitePreview: string//TODO: unterschidlich je nachdem ob inline oder fußnote
}