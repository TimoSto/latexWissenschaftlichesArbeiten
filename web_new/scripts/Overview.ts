import DeleteType from "./DeleteType";
import EditType from "./EditType";

document.addEventListener('DOMContentLoaded', ()=>{

    document.querySelectorAll('#typelist [data-delete]').forEach(el =>{
       const value = el.getAttribute('data-delete');
       el.addEventListener( 'click', ()=>{
           DeleteType(value)
       });
    });

    document.querySelectorAll('#typelist [data-edit]').forEach(el =>{
        const value = el.getAttribute('data-edit');
        el.addEventListener( 'click', ()=>{
            EditType(value)
        });
    });
})