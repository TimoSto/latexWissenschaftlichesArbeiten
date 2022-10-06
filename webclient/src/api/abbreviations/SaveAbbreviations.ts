import {Abbreviation} from "@/api/abbreviations/Abbreviation";

export default async function SaveAbbreviations(abbrs: Abbreviation[], project: string): Promise<Response> {
    const obj = {
        Abbreviations: abbrs,
        Project: project
    };

    const data = JSON.stringify(obj)

    return await fetch('/abbreviations', {
        method: 'POST',
        body: data
    })
}