import QueryProcessor from "../../utils/QueryProcessor";
import '@testing-library/jest-dom'

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
    });

    test('should return shakespeare description', () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
          ));
    });

    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "Rohan"
          ));
    })

    test('should do single digit non-negative int arithmatic', () => {
        const x1 = Math.floor(Math.random() * 10);
        const x2 = Math.floor(Math.random() * 10);        
        const query = `${x1}+${x2}`;
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            `${x1+x2}`
          ));
    })

    test('should do multiple digit unsinged int arithmatic', () => {
        const x1 = Math.floor(Math.random() * 10000);
        const x2 = Math.floor(Math.random() * 10000);        
        const query = `${x1}+${x2}`;
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            `${x1+x2}`
          ));
    })

    test('should do multiple digit unsinged int subtract', () => {
        const x1 = Math.floor(Math.random() * 10000);
        const x2 = Math.floor(Math.random() * 10000) + x1;  // x2 >= x1        
        const query = `${x2}-${x1}`;
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            `${x2-x1}`
          ));
    })

    test('should do multiple digit negative int arithmatic', () => {
        const x1 = -1 * Math.floor(Math.random() * 10000);
        const x2 = -1 * Math.floor(Math.random() * 10000);        
        const query = `${x1}+${x2}`;
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            `${x1+x2}`
          ));
    })
});