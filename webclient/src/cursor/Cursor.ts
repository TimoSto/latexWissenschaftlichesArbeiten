export default class Cursor {
    static getCurrentCursorPosition(parentElement: HTMLElement) {
        const selection = window.getSelection();
        let charCount = -1,
            node;

        if (selection && selection.focusNode) {
            if (Cursor._isChildOf(selection.focusNode, parentElement)) {
                node = selection.focusNode;
                charCount = selection.focusOffset;

                while (node) {
                    if (node === parentElement) {
                        break;
                    }

                    if (node.previousSibling) {
                        node = node.previousSibling;
                        charCount += node.textContent ? node.textContent.length : 0;
                    } else {
                        node = node.parentNode;
                        if (node === null) {
                            break;
                        }
                    }
                }
            }
        }

        return charCount;
    }

    static setCurrentCursorPosition(chars: number, element: HTMLElement) {
        if (chars >= 0) {
            const selection = window.getSelection();

            if( element.innerHTML.length < chars ) {
                chars = element.innerHTML.length;
            }

            const range = Cursor._createRange(element, chars);

            if (range && selection) {
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }

    static _createRange(node: Node, chars: number, range?: Range): Range {
        if (!range) {
            range = document.createRange()
            range.selectNode(node);
            range.setStart(node, 0);
        }

        if (chars === 0) {
            range.setEnd(node, chars);
        } else if (node && chars >0) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent) {
                if (node.textContent.length < chars) {
                    chars -= node.textContent.length;
                } else {
                    range.setEnd(node, chars);
                    chars = 0;
                }
            } else {
                for (let lp = 0; lp < node.childNodes.length; lp++) {
                    range = Cursor._createRange(node.childNodes[lp], chars, range);

                    if (chars === 0) {
                        break;
                    }
                }
            }
        }

        return range;
    }

    static _isChildOf(node: Node|null, parentElement: HTMLElement) {
        while (node !== null) {
            if (node === parentElement) {
                return true;
            }
            node = node.parentNode;
        }

        return false;
    }
}