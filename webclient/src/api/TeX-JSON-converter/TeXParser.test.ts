import {ParseStringToTeX, ParseTexToString} from "@/api/TeX-JSON-converter/TeXParser";

describe('test string to tex', ()=>{
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
    it('should give {{;}}ha{{\\&}}l{{\\_}}lo{{;}}{{\\_}}', ()=>{
        expect(ParseStringToTeX(';ha&l_lo;_')).toEqual('{{;}}ha{{\\&}}l{{\\_}}lo{{;}}{{\\_}}')
    })
    it('should give w{{\\\'{a}}}s', ()=>{
        expect(ParseStringToTeX('wás')).toEqual("w{{\\'{a}}}s")
    })
    it('should give {{\\textless}}a{{\\textgreater}}', ()=>{
        expect(ParseStringToTeX('<a>')).toEqual("{{\\textless}}a{{\\textgreater}}")
    })
    it('should give {{\\textless}}ß{{\\textgreater}}', ()=>{
        expect(ParseStringToTeX('<ß>')).toEqual("{{\\textless}}ß{{\\textgreater}}")
    })
    it('should give {{\\textless}}ß{{\\textgreater}}', ()=>{
        expect(ParseStringToTeX('<{{\\ss}}>')).toEqual("{{\\textless}}ß{{\\textgreater}}")
    })
})

describe('test tex to string', ()=>{
    it('should give <ß>', ()=>{
        expect(ParseTexToString('{{\\textless}}ß{{\\textgreater}}')).toEqual("<ß>")
    })
    it('should give ;ha&l_lo;_', ()=>{
        expect(ParseTexToString('{{;}}ha{{\\&}}l{{\\_}}lo{{;}}{{\\_}}')).toEqual(';ha&l_lo;_')
    })
})
