
export default function separateEntries(file: string): string[] {
    file = file.substring(file.indexOf('@'))

    file = file.replace(/\t/g, '');

    return file.split(/^@/gm).filter(e => e.length > 0);
}
