const fs = require("fs");
const { JSDOM } = require("jsdom");
const { type } = require("os");

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

//console log
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
console.log(greeting.charCodeAt(1), "ASCII Number");

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

//includes 
console.log(pesan2.includes("Multi"));/*disini berniat mengambil value multi dari var pesan2, hanya saja karena includes method sensitive trhdp kapital dia akan mengeluarkan return false*/

//slice method
console.log(pesan2.slice(5, 8));

//codeAt
console.log(String.fromCharCode(65));
console.log(pesan2.charCodeAt("A"));

//replace method
const tsText = "I Love Javascript";
const tsText1 = tsText.replace("Javascript", "Coding");
console.log(tsText1)

//type coercion 
let tCoer1 = '20' + 5;
let tCoer2 = 10 * '2';
let tCoer3 = 'abc' / 2;
let tCoer4 = true + 2;
let tCoer5 = false + 3;

console.log(tCoer1, typeof tCoer1);
console.log(tCoer2, typeof tCoer2);
console.log(tCoer3, typeof tCoer3);

//aritmethic presedence
const aritmethic = 5 + 5 * 5;
const aritmethic1 = (5 + 5) * 5; //dgn parenthess 5 + 5 akan dihitung terlebih dahulu

console.log(aritmethic, "5 * 5 + 5 = 30");
console.log(aritmethic1, "5 + 5 * 5 = 50");

//increment & decrement
let incr = 0;
console.log(incr++, "incr1");
console.log(incr, "incr1");

let incr2 = 0;
console.log(++incr2, "incr2");
console.log(incr2, "incr2");

//equality & inequality operator

console.log(5 == "5", "equality operator"); //true karena otomatis js konversi string "5" ke number
console.log(5 === "5", "strict equality operator"); //tipe data keduanya harus sama, jadi false
console.log(5 != "5", "inequality operator"); //false, keduanya dianggap sama
console.log(5 !== "5", "strict inequality operator"); //true, karena di strict dia membedakan tipe data

//comparison operator
console.log(5 > 5, "false");
console.log(5 >= 5, ), "true";
console.log(5 < 5, "false");
console.log(5 <= 5, "true");

//unary operator
let xxx = '5';
console.log(typeof +xxx, xxx); //mengubah type data string ke number
console.log(-xxx, typeof +xxx); //mengubah 5 menjadi negatif dan ubah string ke number

let xxx1 = true; //membalikan value boolean
console.log(!xxx1);