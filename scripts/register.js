import { tostTopEnd,baseURL, navbarFunction } from "../global/utils.js";

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("username").value;
  const email = document.getElementById("usermail").value;
  const age = document.getElementById("age").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm").value;

  const obj = {
    name,
    email,
    age,
    password,
    confirmPassword,
  };

  try {
    let response = await fetch(`${baseURL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let data = await response.json();

    if (!response.ok) throw new Error(data.message);

    tostTopEnd.fire({
      title: data.message,
      icon: "success",
    });
    setTimeout(()=>window.location.href = "/pages/login.html",2000)
  } catch (error) {
    tostTopEnd.fire({
      title: error.message,
      icon: "info",
    });
    console.log({ error: error.message });
  }
});
navbarFunction();
