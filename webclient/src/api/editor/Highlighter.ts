
export default class Highlighter {

    static CommandRegex = /\\.*(\{| )/g
    static ParseLine(line: string): string {

        const matches = line.matchAll(this.CommandRegex)
        console.log(matches)

        return line
    }
}