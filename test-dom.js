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
  if (password === passCode) {
    passDialog.showModal();
  } else {
    passOutput.textContent = "Sandi Salah!";
  }
});
passCloseBtn.addEventListener("click", () => {
  passDialog.close();
  passOutput.textContent = "-";
  passInput.value = "";
});
passBtn.addEventListener("click", () => {
    passAttempts++;

    if (passAttempts > 2) {
        passOutput.textContent = "Sandi Masih Salah!;";
    }
    if (passAttempts > 3) {
        passOutput.textContent = "Salah Lagi!;";
    }
});

//TEST PILIHAN
const testBtn1 = document.getElementById("testBtn1");
const testBtn2 = document.getElementById("testBtn2");
const testBtn3 = document.getElementById("testBtn3");
const testBtn4 = document.getElementById("testBtn4");
const testOutput = document.getElementById("testOutput");
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