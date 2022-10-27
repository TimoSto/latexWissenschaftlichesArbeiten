
export default function separateEntries(file: string): string[] {
    file = file.substring(file.indexOf('@'))

    return file.split(/^@/gm).filter(e => e.length > 0);
}
