if( window.parent === window ) {
    console.log('loadShell')
    let urlParts = window.location.href.split("/");
    window.location.replace(`/shell/#${ window.location.pathname }`)
}