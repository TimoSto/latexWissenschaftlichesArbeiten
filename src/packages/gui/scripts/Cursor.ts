export default class Cursor {
    static getCurrentCursorPosition(parentElement) {
        var selection = window.getSelection(),
            charCount = -1,
            node;

        if (selection.focusNode) {
            if (Cursor._isChildOf(selection.focusNode, parentElement)) {
                node = selection.focusNode;
                charCount = selection.focusOffset;

                while (node) {
                    if (node === parentElement) {
                        break;
                    }

                    if (node.previousSibling) {
                        node = node.previousSibling;
                        charCount += node.textContent.length;
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

    static setCurrentCursorPosition(chars, element) {
        if (chars >= 0) {
            var selection = window.getSelection();

            let range = Cursor._createRange(element, { count: chars }, undefined);

            if (range) {
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }

    static _createRange(node, chars, range) {
        if (!range) {
            range = document.createRange()
            range.selectNode(node);
            range.setStart(node, 0);
        }

        if (chars.count === 0) {
            range.setEnd(node, chars.count);
        } else if (node && chars.count >0) {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.textContent.length < chars.count) {
                    chars.count -= node.textContent.length;
                } else {
                    range.setEnd(node, chars.count);
                    chars.count = 0;
                }
            } else {
                for (var lp = 0; lp < node.childNodes.length; lp++) {
                    range = Cursor._createRange(node.childNodes[lp], chars, range);

                    if (chars.count === 0) {
                        break;
                    }
                }
            }
        }

        return range;
    }

    static _isChildOf(node, parentElement) {
        while (node !== null) {
            if (node === parentElement) {
                return true;
            }
            node = node.parentNode;
        }

        return false;
    }

    static scrollSelectionIntoView() {
        // Get current selection
        const selection = window.getSelection();

        // Check if there are selection ranges
        if (!selection.rangeCount) {
            return;
        }

        // Get the first selection range. There's almost never can be more (instead of firefox)
        const firstRange = selection.getRangeAt(0);

        // Sometimes if the editable element is getting removed from the dom you may get a HierarchyRequest error in safari
        if (firstRange.commonAncestorContainer === document) {
            return;
        }

        // Create an empty br that will be used as an anchor for scroll, because it's imposible to do it with just text nodes
        const tempAnchorEl = document.createElement('br');

        // Put the br right after the caret position
        firstRange.insertNode(tempAnchorEl);

        // Scroll to the br. I personally prefer to add the block end option, but if you want to use 'start' instead just replace br to span
        tempAnchorEl.scrollIntoView({
            block: 'start',
        });

        // Remove the anchor because it's not needed anymore
        tempAnchorEl.remove();
    };
}