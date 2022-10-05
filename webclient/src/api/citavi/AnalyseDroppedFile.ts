import {BibType} from "@/api/bibType/BibType";

export default function AnalyseDroppedFile(file: string, types: BibType[]) {
    console.log('analyse', file)

    //step 1: split att @ at beginning of line
    const entries = file.split(/^@/gm).filter(e => e.length > 0);


}