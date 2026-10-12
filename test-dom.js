/*UNTUK DOM TESTING*/

//prompt method
const btn = document.getElementById("prompt-btn");
const output = document.getElementById("output");
btn.addEventListener("click", () => {
  const userName = prompt("Siapa Kamu?", "Aku?");
  output.textContent = `${userName}!`;
});

//password input
const passInput = document.getElementById("password-input");
const passBtn = document.getElementById("pass-btn");
const passOutput = document.getElementById("pass-output");
const passDialog = document.getElementById("pass-dialog");
const passCloseBtn = document.getElementById("pass-close-btn");
const passCode = "6767";
let passAttempts = 0;
passBtn.addEventListener("click", () => {
  const password = passInput.value;
  if (password === "") {
    passOutput.textContent = "Masukan Sandi";
  }
  else if (password === passCode) {
    passOutput.textContent = "Benar";
    passDialog.showModal();
    passInput.value = "";
    passAttempts = 0;
  }
  else {
  passAttempts++;

  if (passAttempts >= 4) {
    passOutput.textContent = "Terlalu banyak percobaan!";
  } else {
    passOutput.textContent = `Sandi salah! Percobaan: ${passAttempts}`;
  }
}
});
passCloseBtn.addEventListener("click", () => {
  passDialog.close();
  passOutput.textContent = "";
});

//TEST PILIHAN
const testBtn1 = document.getElementById("testBtn1");
const testBtn2 = document.getElementById("testBtn2");
const testBtn3 = document.getElementById("testBtn3");
const testBtn4 = document.getElementById("testBtn4");
const testBtn5 = document.getElementById("testBtn5");
const testOutput = document.getElementById("testOutput");
const showRest = document.querySelectorAll('.btnJs')
testBtn1.addEventListener("click", () => {
    testOutput.textContent = testBtn1.value;
});
testBtn2.addEventListener("click", () => {
    testOutput.textContent = testBtn2.value;
});
testBtn3.addEventListener("click", () => {
    testOutput.textContent = testBtn3.value;
});
testBtn4.addEventListener("click", () => {
    testOutput.textContent = `${testBtn1.value} ${testBtn2.value} ${testBtn3.value} ${testBtn4.value}`;
});
testBtn5.addEventListener("click", () => {
    testOutput.textContent = "";
});
showRest.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("Tombol diklik!");
    testBtn5.style.display = "block";
  });
});
testBtn5.addEventListener("click", () => {
  testBtn5.style.display = "none";
})

//TEST OPEN BTN

const testBtn6 = document.getElementById("testBtn6");
const testDialog1 = document.getElementById("testDialog1");
const closeDialogBtn1 = document.getElementById("closeDialogBtn1");

testBtn6.addEventListener("click", () => {
  testDialog1.showModal();
  testBtn6.textContent = "X";
});
closeDialogBtn1.addEventListener("click", () => {
  testDialog1.close();
  testBtn6.textContent = "+";
});

//INCLUDES FUNCTION && textTransform

const usrInput = document.getElementById("input-include");
const userOutp = document.getElementById("outputIncl");
const restrcitedBtn = document.getElementById("restrcitedBtn")
let restrcitedUsr = "john, sahri, Bos,Tukam";

restrcitedBtn.addEventListener("click", () => {
if (usrInput.value === "") {
  userOutp.textContent = "Masukan Teks Dulu";
}
else if (restrcitedUsr.toLowerCase().includes(usrInput.value.toLowerCase())) {
    userOutp.textContent = "KAMU DILARANG";
  }
else {
  userOutp.textContent = "YA BOLEH"
}});

//INCREMENT DECREMENT WITH X++ ++X

const incrButton = document.getElementById("totalClick");
const incrOutput = document.getElementById("totalClickOutput");
const decrBtn = document.getElementById("decrClick");
const incrReset = document.getElementById("incrReset");
let clickIncr = 0;

incrButton.addEventListener("click", () => {
  clickIncr++;
  incrOutput.textContent = clickIncr;

  if (clickIncr === 100) {
    clickIncr = 0;
    incrOutput.textContent = clickIncr;
  }
})

decrBtn.addEventListener("click", () => {
  if(clickIncr > 0) {
    clickIncr--
    incrOutput.textContent = clickIncr;
  }
})

incrReset.addEventListener("click", () => {
  if (clickIncr === 0) {
    incrOutput.textContent = "Value kosong"
  }
  else {
    clickIncr = 0;
    incrOutput.textContent = clickIncr;
  }
})