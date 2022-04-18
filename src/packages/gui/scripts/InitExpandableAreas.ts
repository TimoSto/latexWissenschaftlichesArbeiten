import {ParseTexToString} from "./TeXParser";

export default function InitExpandableAreas() {
    let expandableAreas = document.querySelectorAll('.expandable-area');
    let triggerIcons = document.querySelectorAll('.trigger-icon');
    let lis = document.querySelectorAll('#parent-list>li');

    lis.forEach((el, i) => {
        const ind = i;
        el.addEventListener('click', (e)=>{
            if((<HTMLElement>e.target).parentElement.classList.contains('mdc-deprecated-list-item__meta')) {
                return;
            }
            let container = <HTMLElement>expandableAreas[ind];
            let height = container.getBoundingClientRect().height;
            if (container.classList.contains('expandable-area--open')) {

                container.style.height = `${height}px`;

                setTimeout(() => {
                    container.classList.remove('expandable-area--open');
                    container.classList.add('expandable-area--closing');

                    setTimeout(() => {
                        container.style.removeProperty('height');
                        container.classList.remove('expandable-area--closing');
                        container.classList.add('expandable-area--closed');
                    }, 350);
                }, 0);

            } else if (container.classList.contains('expandable-area--closed')) {
                container.style.height = '0px';

                setTimeout(() => {
                    container.classList.remove('expandable-area--closed');
                    container.classList.add('expandable-area--opening');
                    container.style.height = `${height}px`;

                    setTimeout(() => {
                        container.style.removeProperty('height');
                        container.classList.remove('expandable-area--opening');
                        container.classList.add('expandable-area--open');
                    }, 350);
                }, 0);
            }
            triggerIcons[ind].classList.toggle('trigger-icon--rotated');
        })
    })

    let primaryTexts = document.querySelectorAll('.mdc-deprecated-list-item__primary-text');
    primaryTexts.forEach((el: HTMLElement) => {
        el.innerHTML = ParseTexToString(el.innerText);
    })
}