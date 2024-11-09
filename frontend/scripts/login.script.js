const loginURL = "http://localhost:3400/login";
let currentUser = JSON.parse(localStorage.getItem("logged_in_user")) || null;
document.addEventListener("DOMContentLoaded", function () {
  if (currentUser) {
    showUserDetails(currentUser); // Show user details if logged in
  } else {
    showLoginForm(); // Show login form if not logged in
  }
});

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("usermail").value;
  const password = document.getElementById("password").value;

  const obj = {
    email,
    password,
  };

  try {
    let response = await fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let data = await response.json();
    if (response.ok) {
      currentUser = data.user;
      showUserDetails(currentUser);
      // window.location.href = "/" cause: stoping to save token in LS
      localStorage.setItem("token", data.token);
      localStorage.setItem("logged_in_user", JSON.stringify(currentUser));
      alert("User logged in successfully");
    } else {
      alert("incorrect credentials");
      location.reload();
    }
  } catch (error) {
    console.log({ error: error.message });
  }
});

function showUserDetails(user) {
  console.log(user);
  document.getElementById("login-form").style.display = "none";
  document.getElementById("user-details").style.display = "block";

  document.getElementById("user-name").textContent = user.name;
  document.getElementById("user-email").textContent = user.email;
  document.getElementById("user-dob").textContent = user.date_of_birth;
  document.getElementById("user-role").textContent = user.role;
  document.getElementById("user-location").textContent = user.location;
  document.getElementById("user-password").textContent = user.password;
}

function showLoginForm() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("user-details").style.display = "none";
}
