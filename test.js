const fs = require("fs");
const { JSDOM } = require("jsdom");

const html = fs.readFileSync("lab.html", "utf8");

const dom = new JSDOM(html);
const document = dom.window.document;

//LET STRING/TEXT
let testVar2 = 'John';
let testVar3 = "Doe";
let greeting = "Hello"
let location = "C DISK";
//LET NUMBER/NOMER
let testVar = 10; 
testVar = 20 + 4 - 9;
testVar = 4;
//BOOLEAN/ TRUE FALSE
let testBool = false;
//undefined / KOSONGAN
let testKosong;
//const
const maxScore = 100;
const introduction = "My name is " + testVar2 + " " + testVar3 + ". I am a student.";
const locationInfo = "I live in " + location;
//string concatenation
let fullName = testVar2 + " " + testVar3;
let jumlah = testVar;
jumlah += maxScore;
let hasil = greeting.concat(', ', testVar2);

let lolos = testVar >= 11;

let x = 10;
const y = x;

x = 20;
console.log(x + "x");
console.log(y + "y");


console.log(lolos);
if (lolos) {
    console.log("Lolos");
} else {
    console.log("Tidak Lolos")
}

if (x >= 20) {
    console.log("x lebih besar dari 20");
}
else {
    console.log("x lebih kecil dari 20");
}
//tampilkan html element di console
const userName = document.getElementById("userId");
console.log(userName.textContent);

let textTest = "Hello";
textTest += ", World!";
console.log(textTest);

console.log(fullName);
console.log(maxScore);
console.log("Hello, " + testVar2);
console.log(testVar);
console.log(testBool);
console.log(testKosong);
console.log(jumlah);
console.log(hasil);
console.log(introduction + " " + locationInfo);

console.log(typeof testVar2);
console.log(typeof testVar);
console.log(typeof testBool);
console.log(typeof testKosong);

//bracket notation
let testText2 = "Hello";
console.log(testText2[2] + " " + testText2.length);
console.log(greeting[greeting.length - 1]);

//new line dalam string
let testText3 = "Hello\nWorld!";
console.log(testText3);

//buat quote dalam string
let testText4 = "He said, \"Hello!\"";
console.log(testText4);

//template literals / string interpolation
let pesan = `${greeting}, my name is ${testVar2} ${testVar3}. I live in ${location}.`;
console.log(pesan);
let pesan2 = `ini pesan multi line
yang dibuat pakai template literal.`;
console.log(pesan2);

//indexOf method
let index = pesan.indexOf("my name");
let falseIndex = pesan.indexOf("not found");
console.log(index);
console.log(falseIndex);