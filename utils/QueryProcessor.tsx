var Parser = require('expr-eval').Parser;

function getMethods(obj: { [x: string]: { toString: () => string; }; }) {
  var result = [];
  for (var id in obj) {
    try {
      if (typeof(obj[id]) == "function") {
        result.push(id + ": " + obj[id].toString());
      }
    } catch (err) {
      result.push(id + ": inaccessible");
    }
  }
  return result;
}


export default function QueryProcessor(query: string): string {
  if (query.trim().length === 0) return "";
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "Rohan";
  }

  if (query.toLowerCase().includes("andrewid")) {
    return "mhmannai";
  }

  // no anything that's not math related
  if (!(/[a-zA-Z_\\\$\|\?\{\}\[\]]/.test(query))) {
    var parser = new Parser();
    try {
      var answer = parser.parse(query).evaluate();
      return `${answer}`;
    } catch {
      return "invalid";
    }
  }

  return "";
}
