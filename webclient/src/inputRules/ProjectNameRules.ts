
export default function ProjectNameRules(projectNames: string[]) {
    // const projectNames = projects;
    // console.log(projects);
    return [
        (value: string) => {
            if ( projectNames && projectNames.indexOf(value) !== -1) return 'Projektname bereits vergeben'
            if ( value && value.indexOf(' ') >= 0 ) return 'Projektname darf kein Leerzeichen enthalten'
            return true
        }
    ]
}