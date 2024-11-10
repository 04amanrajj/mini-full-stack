const registerURL = "http://localhost:3400/user/register";

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
    let response=await fetch(registerURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let data=await response.json()

    if(!response.ok) throw new Error(data.message);
    
    alert("New user registerd");
    window.location.href = "/pages/login.html";
  } catch (error) {
    alert(error.message)
    console.log({ error: error.message });
  }
});
