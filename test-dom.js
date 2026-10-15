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
  clickIncr++; //clickIncr = clickIncr + 1;
  incrOutput.textContent = clickIncr;

  if (clickIncr === 100) {
    clickIncr = 0;
    incrOutput.textContent = clickIncr;
  }
})

decrBtn.addEventListener("click", () => {
  if(clickIncr > 0) {
    clickIncr--; //clickIncr = clickIncr - 1;
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

//testt if modal
const ifModal = document.getElementById("modalInputIft");
const ifDialog = document.getElementById("modalDialogIft");
const ifClose = document.getElementById("ifClose");
const ifSubmit = document.getElementById("ifSubmit");
const ifOutput = document.getElementById("ifModaSlOut1");
const ifOutput2 = document.getElementById("ifModalOut2");
const ifInput1 = document.getElementById("ifInput1");
const ifInput2 = document.getElementById("ifInput2")
const ifDialog2 = document.getElementById("modalDialogIft2");
const ifOutput3 = document.getElementById("ifModalOut3")

ifModal.addEventListener("click", () => {
  ifDialog.showModal()
})

ifClose.addEventListener("click", () => {
  ifDialog.close()
})

ifSubmit.addEventListener("click", () => {
  const age = Number(ifInput2.value);
  const name = ifInput1.value;
 if (age >= 18) {
   ifOutput.textContent = `Halo ${name} kamu eligible`;
   ifInput1.disabled = true;
   ifInput2.disabled = true;
 }
 else {
  ifOutput.textContent = `Hai ${name}, Kamu tidak memenuhi syarat`;
  ifDialog.close();
  ifDialog2.showModal()
 }
 const userAge = age < 15 ? `Bocil` : ``;
 ifOutput3.textContent = `Minggir kamu ${userAge}`;
})
