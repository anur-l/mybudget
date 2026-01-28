/** @type {HTMLElement | null} */
const incomebtn = document.querySelector("#incomeradio");
/** @type {HTMLElement | null} */
const expensebtn = document.querySelector("#expenseradio");
/** @type {HTMLElement | null} */
const head_sec = document.querySelector(".heading_select");
/** @type {HTMLElement | null} */
const combo = document.querySelector(".combo");
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
  balance: 1000,
};
const savebudget = localStorage.getItem("tbudget");
if (savebudget) {
  typebudget = JSON.parse(savebudget);
}

const saving_history = localStorage.getItem("budgetHistory");
if (saving_history) {
  history_list = JSON.parse(saving_history);
}

function read(item) {
  if (!item) return;
  /** @type {HTMLElement | null} */
  let listli = document.createElement("div");
  listli.classList.add("items");
  listli.style.display = "flex";
  listli.style.justifyContent = "space-around";
  listli.style.background = "#ffffff";
  listli.style.borderLeft = "6px solid #74ed02";
  listli.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
  listli.style.padding = "1rem";
  listli.style.color = "#333";
  listli.style.borderRadius = "5px";
  listli.style.marginBottom = "10px";

  let para = document.createElement("p");
  para.textContent = item.expense;
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
  delbtn.addEventListener("click", () => {
    history_list = history_list.filter((t) => t.id !== item.id);
    typebudget[item.expense] -= item.money;
    localStorage.setItem("budgetHistory", JSON.stringify(history_list));
    localStorage.setItem("tbudget", JSON.stringify(typebudget));
    listli.remove();
    localStorage.setItem("save_element", list_t.innerHTML);
  });
}

window.onload = function() {
  // console.log("Debugging");
  // console.log("tbudget: ", localStorage.getItem("tbudget"));
  // console.log("budgethistory:", localStorage.getItem("budgetHistory"));
  // console.log("save_element:", localStorage.getItem("save_element"));
  //  console.log("History:", history_list);

  const saving_element = localStorage.getItem("save_element");
  if (saving_element && list_t) {
    // console.log("loading save_element");
    list_t.innerHTML = saving_element;
  } else {
    //  console.log("building hisotry");
    if (list_t) {
      list_t.innerHTML = "";
      history_list.forEach((item) => {
        read(item);
      });
    }
  }
};

btn.addEventListener("click", () => {
  /** @type {HTMLElement | null} */
  let incomep = document.querySelector("#income");
  /** @type {HTMLElement | null} */
  let expensep = document.querySelector("#expense");
  /** @type {HTMLElement | null} */
  let balancep = document.querySelector("#balance");
  console.log("check button");
  if (num.value.trim() === "") {
    alert("Missing input");
    return;
  }
  if (incomebtn.checked === true) {
    totalsum.income = num.value;
    incomep.innerText = totalsum.income;
    return;
  }
  let selectitem = "";
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
  let infobudget = {
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

  history_list.push(infobudget);
  localStorage.setItem("tbudget", JSON.stringify(typebudget));
  localStorage.setItem("budgetHistory", JSON.stringify(history_list));

  read(infobudget);

  let amount = Number(totalsum.balance) - infobudget.money;
  if (amount) {
    totalsum.balance = amount;
    totalsum.expense += infobudget.money;
    expensep.innerText = totalsum.expense;
    balancep.innerText = totalsum.balance;
  }

  localStorage.setItem("mybalance", totalsum);
  localStorage.setItem("save_element", list_t.innerHTML);
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
    /** @type {HTMLInputElement | null} */
    const radio = opt.querySelector('input[type="radio"]');
    if (radio) {
      radio.checked = true;
    }
    head_sec.innerHTML = `Type: <strong>${displaying}</strong>`;
  });
});
