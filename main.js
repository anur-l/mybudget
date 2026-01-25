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
let list_t;
const btn = document.querySelector(".verify");
/** @type {Object[]} */
let history_list = [];
let typebudget = {
  rent: 0,
  food: 0,
  transport: 0,
  utilitie: 0,
  other: 0,
};
let time_date = new Date().toLocaleDateString();

window.onload = function() {
  const save_element = localStorage.getItem("save_element");
  list_t = document.querySelector(".transaction");
  if(time_date != history_list)
  if (save_element && list_t) {
    list_t.innerHTML = save_element;
  }
};

const savebudget = localStorage.getItem("tbudget");
if (savebudget) {
  typebudget = JSON.parse(savebudget);
}

const saving_history = localStorage.getItem("budgetHistory");
if (saving_history) {
  history_list = JSON.parse(saving_history);
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
    date: timedate,
  };

  /** @type {HTMLElement | null} */
  let listli = document.createElement("div");
  listli.style.display = "flex";
  listli.style.justifyContent = "space-evenly";
  let para = document.createElement("p");

  console.log("check", selectitem);

  para.textContent = selectitem;
  let para_num = document.createElement("p");
  para_num.textContent = infobudget.money;
  history_list.push(infobudget);
  listli.appendChild(para);
  listli.appendChild(para_num);
  if (list_t) {
    list_t.appendChild(listli);
  } else {
    console.error("Error there problem");
  }
  localStorage.setItem("save_element", list_t.innerHTML);
  localStorage.setItem("budgetHistory", JSON.stringify(history_list));
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
