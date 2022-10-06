import {ParseStringToTeX} from "@/api/bibEntry/ParseTeXString";

describe('parsing string to tex', ()=> {
    it('Value: "hallo_gi"', ()=> {
        expect(ParseStringToTeX('hallo_gi')).toEqual('hallo{{\\_}}gi')
    })
    it('Value: "hallo_gi_bl"', ()=> {
        expect(ParseStringToTeX('hallo_gi_bl')).toEqual('hallo{{\\_}}gi{{\\_}}bl')
    })
    it('Value: "_hallo"', ()=> {
        expect(ParseStringToTeX('_hallo_gi_bl')).toEqual('{{\\_}}hallo{{\\_}}gi{{\\_}}bl')
    })
    it('Value: "h{{\\_}}i"', ()=> {
        expect(ParseStringToTeX('h{{\\_}}i')).toEqual('h{{\\_}}i')
    })
    it('Value: "hái"', ()=> {
        expect(ParseStringToTeX('hái')).toEqual('h{{\\\'{a}}}i')
    })
    it('Value: "<á>"', ()=> {
        expect(ParseStringToTeX('<á>')).toEqual('{{\\textless}}{{\\\'{a}}}{{\\textgreater}}')
    })
    it('Value: "<$>"', ()=> {
        expect(ParseStringToTeX('<$>')).toEqual('{{\\textless}}{{\\$}}{{\\textgreater}}')
    })
    it('Value: "__%_string#s##_"', ()=> {
        expect(ParseStringToTeX('__%_string#s##_')).toEqual('{{\\_}}{{\\_}}{{\\%}}{{\\_}}string{{\\#}}s{{\\#}}{{\\#}}{{\\_}}')
    })
    it('Value: "&a&b&"', ()=> {
        expect(ParseStringToTeX('&a&b&')).toEqual('{{\\&}}a{{\\&}}b{{\\&}}')
    })
})