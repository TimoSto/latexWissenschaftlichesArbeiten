import ProjectNameRules from "@/inputRules/ProjectNameRules";

describe('ProjectNameRules', () => {
    let rules: ((v: string) => boolean | string)[];
    beforeEach(() => {
        rules = ProjectNameRules(["test1", "test2"], (v: string) => v);
    });

    it('should give error on "test1"', () => {
        expect(rules[0]('test1')).toEqual('Projects.New.AlreadyExists')
    })

    it('should give error on "test2"', () => {
        expect(rules[0]('test2')).toEqual('Projects.New.AlreadyExists')
    })

    it('should give error on "test t"', () => {
        expect(rules[0]('test t')).toEqual('Projects.New.NoSpaces')
    })

    it('should not give error on "test"', () => {
        expect(rules[0]('test')).toBe(true);
    })
})