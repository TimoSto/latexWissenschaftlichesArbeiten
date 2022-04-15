import {Package} from "./EditStyles";

export default function SaveStyles(project: string, packages: Package[]) {
    let obj = {
        Project: project,
        Packages: []
    }

    packages.forEach(p => {
        obj.Packages.push({
            Name: p.Name,
            Included: p.Included,
            ActiveOption: p.ActiveOption
        });
    });

    return window.fetch('/saveStyle', {
        method: 'POST',
        body: JSON.stringify(obj)
    }).then(response => {

        if( response.status === 200 ){
            return true
        }
    });
}