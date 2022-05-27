
function LoadTheming() {
    let themeContent = localStorage.getItem('WALaTeXThemeContent');

    if( themeContent ) {
        const link = document.createElement('link');
        link.href = `data:text/css;base64,${btoa(themeContent)}`;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        let head = document.getElementsByTagName('head')[0];
        if( head ) {
            head.insertAdjacentElement('afterbegin', link);
        } else {
            window.addEventListener('DOMContentLoaded', ()=>{
                document.getElementsByTagName('head')[0].insertAdjacentElement('afterbegin', link);
            })
        }

        return
    }
    let theme = localStorage.getItem('WALaTeXTheme');

    theme = theme ? theme : 'light';

    fetch('/themes?theme='+theme).then(resp=>resp.text()).then(data => {
        window.localStorage.setItem('WALaTeXThemeContent', data)
        const link = document.createElement('link');
        link.href = `data:text/css;base64,${btoa(data)}`;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        let head = document.getElementsByTagName('head')[0];

        if( head ) {
            head.insertAdjacentElement('afterbegin', link);
        } else {
            window.addEventListener('DOMContentLoaded', ()=>{
                document.getElementsByTagName('head')[0].insertAdjacentElement('afterbegin', link);
            })
        }
    });
}

LoadTheming();