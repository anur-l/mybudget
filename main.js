/** @type {HTMLElement | null} */
const head_sec = document.querySelector(".heading_select");
/** @type {HTMLElement | null} */
const combo = document.querySelector(".combo");
const option = document.querySelectorAll(".option");
/** @type {HTMLElement | null} */
const descrip = document.querySelector("#descp");
/** @type {HTMLElement | null} */
const num = document.querySelector("#num");
/** @type {NodeListOf<HTMLInputElement>} */
const radios = document.querySelectorAll('input[name="category"]');

let typebudget = {
  rent: 0,
  food: 0,
  transport: 0,
  utilitie: 0,
  other: 0,
};

//const savepersonal = localStorage.getItem("pbudget");
const savebudget = localStorage.getItem("tbudget");
if (savebudget) {
  typebudget = JSON.parse(savebudget);
}

function savebudger() {
  if (!num) {
    alert("Missing input");
    return;
  }
  let selectitem = "";
  radios.forEach((rb) => {
    if (rb.checked) selectitem = rb.id;
  });
  if (selectitem === "rent") {
    typebudget.rent += Number(num.value);
  } else if (selectitem === "food") {
    typebudget.food += Number(num.value);
  } else if (selectitem === "utilitie") {
    typebudget.utilitie += Number(num.value);
  } else if (selectitem === "transport") {
    typebudget.transport += Number(num.value);
  } else {
    typebudget.other += Number(num.value);
  }
  localStorage.setItem("tbudget", JSON.stringify(typebudget));
  let infobudget = {
    description: descrip.value,
    money: Number(num.value),
    expense: selectitem,
    date: Date.now(),
  };
  descrip.value = "";
  num.value = "";
  return infobudget;
}
head_sec.addEventListener("click", () => {
  combo.style.display = combo.style.display === "block" ? "none" : "block";
});

option.forEach((opt) => {
  opt.addEventListener("click", () => {
    let displaying = opt.querySelector("label").innerText;
    head_sec.innerHTML = `Type: <strong>${displaying}</strong>`;
    combo.style.display = "none";
  });
});
