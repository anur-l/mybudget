/** @type {HTMLInputElement | null} */
const incomebtn = document.querySelector("#income_radio");
/** @type {HTMLInputElement | null} */
const expensebtn = document.querySelector("#expense_radio");
/** @type {HTMLElement | null} */
const head_sec = document.querySelector(".heading_select");
/** @type {NodeListOf<HTMLElement>} */
const option = document.querySelectorAll(".option");
/** @type {HTMLInputElement | null} */
const descrip = document.querySelector("#descp");
/** @type {HTMLInputElement | null} */
const num = document.querySelector("#num");
/** @type {NodeListOf<HTMLInputElement>} */
const radios = document.querySelectorAll('input[name="category"]');
/** @type {HTMLElement | null} */
const list_t = document.querySelector(".transaction");
/** @type {HTMLElement | null} */
const btn = document.querySelector(".verify");
/** @type {HTMLElement | null} */
const category = document.querySelector(".category_radio");
/** @type {HTMLElement | null} */
let incomep = document.querySelector("#income");
/** @type {HTMLElement | null} */
let expensep = document.querySelector("#expense");
/** @type {HTMLElement | null} */
let balancep = document.querySelector("#balance");
/** @type {HTMLElement | null} */
let moneytype = document.querySelector(".moneytype");

/** @type {HTMLElement | null} */
let rent_amount = document.querySelector("#rent_amount");
/** @type {HTMLElement | null} */
let food_amount = document.querySelector("#food_amount");
/** @type {HTMLElement | null} */
let transport_amount = document.querySelector("#transport_amount");
/** @type {HTMLElement | null} */
let utilitie_amount = document.querySelector("#utilitie_amount");
/** @type {HTMLElement | null} */
let other_amount = document.querySelector("#other_amount");
/** @type {any[]} */
let history_list = [];

let typebudget = {
  rent: 0,
  food: 0,
  transport: 0,
  utilitie: 0,
  other: 0,
};

let totalsum = {
  income: 0,
  expense: 0,
  balance: 0,
};

function display_money() {
  if (incomep) incomep.innerText = totalsum.income.toString();
  if (expensep) expensep.innerText = totalsum.expense.toString();
  if (balancep) balancep.innerText = totalsum.balance.toString();
}

function update_category() {
  rent_amount.textContent = typebudget.rent;
  food_amount.textContent = typebudget.food;
  transport_amount.textContent = typebudget.transport;
  utilitie_amount.textContent = typebudget.utilitie;
  other_amount.textContent = typebudget.other;
}
if (head_sec) head_sec.innerHTML = "Type: <strong>Expense</strong>";
const savebudget = localStorage.getItem("tbudget");
if (savebudget) {
  typebudget = JSON.parse(savebudget);
}

const saving_history = localStorage.getItem("budgetHistory");
if (saving_history) {
  history_list = JSON.parse(saving_history);
}

const get_total = localStorage.getItem("mybalance");
if (get_total) {
  totalsum = JSON.parse(get_total);
}

expensebtn.checked = true;

function read(item) {
  if (!item) return;
  display_money();
  let listli = document.createElement("div");
  listli.classList.add("items");
  listli.style.display = "flex";
  listli.style.justifyContent = "space-around";
  listli.style.background = "#ffffff";
  if (item.budget === true) {
    listli.style.borderLeft = "6px solid #74ed02";
  } else {
    listli.style.borderLeft = "6px solid red";
  }
  listli.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
  listli.style.padding = "1rem";
  listli.style.color = "#333";
  listli.style.borderRadius = "5px";
  listli.style.marginBottom = "10px";

  let para = document.createElement("p");
  para.textContent = item.description || item.expense;
  para.style.padding = "0.5rem";

  let para_num = document.createElement("p");
  para_num.textContent = item.money;
  para_num.style.padding = "0.5rem";

  let delbtn = document.createElement("button");
  delbtn.classList.add("del");
  delbtn.innerText = "Delete";
  let para_data = document.createElement("p");
  para_data.textContent = item.date;
  para_data.style.padding = "0.5rem";

  listli.appendChild(para);
  listli.appendChild(para_num);
  listli.appendChild(para_data);
  listli.appendChild(delbtn);
  list_t.appendChild(listli);
  update_category();
  delbtn.addEventListener("click", () => {
    if (item.budget == true) {
      totalsum.income -= item.money;
      totalsum.balance -= item.money;
    } else {
      totalsum.balance += item.money;
      totalsum.expense -= item.money;
      typebudget[item.expense] -= item.money;
    }
    history_list = history_list.filter((t) => t.id !== item.id);
    localStorage.setItem("budgetHistory", JSON.stringify(history_list));
    localStorage.setItem("mybalance", JSON.stringify(totalsum));
    localStorage.setItem("tbudget", JSON.stringify(typebudget));
    listli.remove();
    display_money();
  });
}

window.onload = function () {
  if (list_t) {
    list_t.innerHTML = "";
    history_list.forEach((item) => {
      read(item);
    });
  }
  display_money();
  update_category();
};

btn.addEventListener("click", () => {
  let budgetcheck = false;
  console.log("check button");

  if (num.value.trim() === "") {
    alert("Missing input");
    return;
  }

  let checkincome = incomebtn?.checked;
  let selectitem = "";

  if (checkincome) {
    budgetcheck = true;
    selectitem = "income";
    totalsum.income += Number(num.value);
    totalsum.balance += Number(num.value);
  } else {
    if (Number(num.value) > totalsum.balance) {
      alert("low balance " + totalsum.balance);
      return;
    }
    radios.forEach((rb) => {
      if (rb.checked) {
        selectitem = rb.id;
      }
    });
    if (selectitem === "") {
      selectitem = "other";
    }
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
    totalsum.balance -= Number(num.value);
    totalsum.expense += Number(num.value);

    budgetcheck = false;
  }

  let infobudget = {
    budget: budgetcheck,
    id: Date.now(),
    description: descrip.value,
    money: Number(num.value),
    expense: selectitem,
    date: new Date()
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .replace(",", ""),
  };

  read(infobudget);
  localStorage.setItem("mybalance", JSON.stringify(totalsum));
  history_list.push(infobudget);
  localStorage.setItem("tbudget", JSON.stringify(typebudget));
  localStorage.setItem("budgetHistory", JSON.stringify(history_list));
  descrip.value = "";
  num.value = "";
  return infobudget;
});

option.forEach((opt) => {
  opt.addEventListener("click", () => {
    let displaying = opt.querySelector("label").innerText;
    /** @type {HTMLInputElement | null} */
    const radio = opt.querySelector('input[type="radio"]');
    if (radio) {
      radio.checked = true;
    }
    if (head_sec) {
      head_sec.innerHTML = `Type: <strong>${displaying}</strong>`;
    }
  });
});
