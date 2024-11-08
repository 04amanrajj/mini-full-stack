document.addEventListener("DOMContentLoaded", function () {
  const navbarContainer = document.createElement("div");
  navbarContainer.className = "navbar-container";

  const currentUser = localStorage.getItem("logged_in_user");
  const username = currentUser ? JSON.parse(currentUser).name : "Login";

  navbarContainer.innerHTML = `
<style>
      body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      color: #333;
      background-color: #f9f9fb; 
    }

    .navbar-container {
      background-color: #374151; 
      padding: 15px;
      text-align: center;
    }

    .navbar-container a {
      color: #ffffff; 
      text-decoration: none;
      margin: 0 15px;
      font-weight: 500;
      font-size: 1rem;
      transition: color 0.3s ease;
    }

    .navbar-container a:hover {
      color: #93c5fd; 
    }
</style>
        <a href="/index.html">Home</a>
        <a href="/pages/about.page.html">About</a>
        <a id="loginTag" href="/pages/login.page.html">Login</a>
        <a id="signupTag" href="/pages/signup.page.html">Signup</a>
        <a href="/pages/admin.page.html">Manage</a>
    `;

  // Prepend the navbar to the body
  document.body.prepend(navbarContainer);

  if (currentUser) {
    const loginTag = document.querySelector("#loginTag");
    loginTag.textContent = username;
    // loginTag.href = "#";

    const signupTag = document.querySelector("#signupTag");
    signupTag.textContent = "Logout";
    signupTag.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("logged_in_user");
      location.reload();
    });
    signupTag.href = "#";
  }
});
