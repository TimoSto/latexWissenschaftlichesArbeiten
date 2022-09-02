import {ParseStringToTeX} from "@/api/TeX-JSON-converter/TeXParser";

describe('test', ()=>{
    it('should give hallo', ()=>{
        expect(ParseStringToTeX('hallo')).toEqual('hallo')
    })
})