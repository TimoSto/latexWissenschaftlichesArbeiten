import Lapi from "./Lapi";

if( window.parent === window ) {

    window.location.replace(`/shell/#${ window.location.pathname }`)
} else {
    (<any>window).lapi = new Lapi( (<any>window.parent).shell );
}