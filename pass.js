document.addEventListener("DOMContentLoaded", function() {
  const sumbtn = document.querySelector(".submit");

  sumbtn.addEventListener("click", function() {
    const user = document.querySelector("#user");
    const mail = document.querySelector("#mail");
    const password = document.querySelector("#password");
    if (user.value.length < 3) {
      alert("It must contain atleast 3 character");
      return;
    }

    if (!mail.value) {
      alert("Enter yor email?");
      return;
    }
    if (!mail.value.includes("@")) {
      alert("Email mist include @");
      return;
    }

    if (!mail.value.includes(".")) {
      alert("Email msut include .");
      return;
    }

    if (password.value.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    user.value = "";
    password.value = "";
    mail.value = "";
  });
});
