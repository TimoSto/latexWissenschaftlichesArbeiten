import {ParseStringToTeX} from "@/api/TeX-JSON-converter/TeXParser";

describe('test', ()=>{
    it('should give hallo', ()=>{
        expect(ParseStringToTeX('hallo')).toEqual('hallo')
    })
    it('should give hallo{{\\_}}', ()=>{
        expect(ParseStringToTeX('hallo_')).toEqual('hallo{{\\_}}')
    })
    it('should give hallo{{\\_}}', ()=>{
        expect(ParseStringToTeX('hallo{{\\_}}')).toEqual('hallo{{\\_}}')
    })
    it('should give {{\\_}}}}{{\\_}}', ()=>{
        expect(ParseStringToTeX('__')).toEqual('{{\\_}}{{\\_}}')
    })
    it('should give {{\\_}}hallo{{\\_}}', ()=>{
        expect(ParseStringToTeX('_hallo_')).toEqual('{{\\_}}hallo{{\\_}}')
    })
    it('should give hal{{\\_}}lo{{\\_}}', ()=>{
        expect(ParseStringToTeX('hal_lo_')).toEqual('hal{{\\_}}lo{{\\_}}')
    })
    it('should give {{\\_}}hal{{\\_}}lo{{\\_}}{{\\_}}', ()=>{
        expect(ParseStringToTeX('_hal_lo__')).toEqual('{{\\_}}hal{{\\_}}lo{{\\_}}{{\\_}}')
    })
})