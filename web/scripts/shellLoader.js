if( window.parent === window ) {
    console.log('loadShell')
    let urlParts = window.location.href.split("/");
    window.location.replace(`/shell/#${ urlParts[urlParts.length - 1] }`)
}