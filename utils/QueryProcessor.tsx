import { maxHeaderSize } from "http";

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
  query = query.trim();
  while (query[query.length-1] === '?') {
    query = query.substring(0, query.length-1);
  }
  query = query.trim();

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

  var qmax: string = "which of the following numbers is the largest:";
  if (query.toLowerCase().includes(qmax)) {
    var nums = query.slice(qmax.length)
    var intlist = nums.split(',').map(Number);
    return `${Math.max(...intlist)}`;
  }

  var isSquare = function (n) {
    return n > 0 && Math.sqrt(n) % 1 === 0;
};
var isQube = function (n) {
    return n > 0 && Math.cbrt(n) % 1 === 0;
};

  var qmax: string = "which of the following numbers is both a square and a cube:";
  if (query.toLowerCase().includes(qmax)) {
    var nums = query.slice(qmax.length)
    var intlist = nums.split(',').map(Number);
    var out: Number[] = [];
    intlist.forEach(n => {
      if (isSquare(n) && isQube(n)) {out.push(n);}
    });
    return `${out}`;
  }



  query = query.toLowerCase().replaceAll("what is", "")
  query = query.toLowerCase().replaceAll("plus", "+")
  query = query.toLowerCase().replaceAll("minus", "-")
  query = query.toLowerCase().replaceAll("multiplied by", "*")
  query = query.toLowerCase().replaceAll("divided by", "/")

  // no anything that's not math related
  if (!(/[a-zA-Z_@\\\$\|\?\{\}\[\]]/.test(query))) {
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
