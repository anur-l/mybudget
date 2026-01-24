const head_sec = document.querySelector(".heading_select");
const combo = document.querySelector(".combo");
const opt = document.querySelectorAll(".option");

head_sec.addEventListener("click", () => {
  const displaycss = combo.style.display === "block";
  combo.style.display = displaycss ? "none" : "block";
});

opt.forEach((opt) => {
  opt.addEventListener("click", () => {
    const displaying = opt.querySelector("label").innerText;
    heading.innerHTML = `Type: <strong>${displaying}</strong>`;
    combo.style.display = "none";
  });
});
