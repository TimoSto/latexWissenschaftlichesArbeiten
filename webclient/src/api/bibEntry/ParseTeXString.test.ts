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
})