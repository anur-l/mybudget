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
const list_t = document.querySelector(".transaction");
const btn = document.querySelector(".verify");
/** @type {Object[]} */
let historyList = [];
let typebudget = {
  rent: 0,
  food: 0,
  transport: 0,
  utilitie: 0,
  other: 0,
};

const savebudget = localStorage.getItem("tbudget");
if (savebudget) {
  typebudget = JSON.parse(savebudget);
}

const savedHistory = localStorage.getItem("budgetHistory");
if (savedHistory) {
  historyList = JSON.parse(savedHistory);
}

btn.addEventListener("click", () => {
  console.log("check button");
  if (num.value.trim() === "") {
    alert("Missing input");
    return;
  }
  let selectitem = "";
  radios.forEach((rb) => {
    if (rb.checked) {
      selectitem = rb.id;
    }
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

  listli = document.createElement("div");
  para = document.createElement("p");

  console.log("check", selectitem);

  para.textContent = selectitem;
  para_num = document.createElement("p");
  para_num.textContent = infobudget.money;
  historyList.push(infobudget);
  listli.appendChild(para);
  listli.appendChild(para_num);

  if (list_t) {
    list_t.appendChild(listli);
  } else {
    console.error("Error there problem");
  }
  localStorage.setItem("budgetHistory", JSON.stringify(historyList));
  descrip.value = "";
  num.value = "";
  return infobudget;
});
head_sec.addEventListener("click", () => {
  combo.style.display = combo.style.display === "block" ? "none" : "block";
});

option.forEach((opt) => {
  opt.addEventListener("click", () => {
    let displaying = opt.querySelector("label").innerText;
    const radio = opt.querySelector('input[type="radio"]');
    if (radio) {
      radio.checked = true;
    }
    head_sec.innerHTML = `Type: <strong>${displaying}</strong>`;
    combo.style.display = "none";
  });
});
