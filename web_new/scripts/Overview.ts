import DeleteType from "./DeleteType";

document.addEventListener('DOMContentLoaded', ()=>{

    document.querySelectorAll('#typelist [data-delete]').forEach(el =>{
       const value = el.getAttribute('data-delete');
       el.addEventListener( 'click', ()=>{
           DeleteType(value)
       });
    });
})