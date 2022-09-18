export default function GetCaretCharacterOffsetWithin(element: HTMLElement): number {
    let caretOffset = 0;
    const doc = element.ownerDocument
    const win = doc.defaultView;
    let sel;
    if( !win ) {
        return 0
    }
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel && sel.rangeCount > 0) {
            const range = sel.getRangeAt(0);
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    }
    return caretOffset;
}