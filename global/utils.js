let baseURL = `https://note-app-backend-yl4f.onrender.com`;

function navbarFunction() {
  const currentUser = localStorage.getItem("logged_in_user");
  const username = currentUser ? JSON.parse(currentUser).name : "Login";

  if (currentUser) {
    const loginTag = document.getElementById("loginTag");
    loginTag.textContent = username;

    const signupTag = document.getElementById("signupTag");
    signupTag.textContent = "Logout";
    signupTag.addEventListener("click", async (e) => {
      const token = localStorage.getItem("token");
      try {
        let response = await fetch(`${baseURL}/user/logout`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        let data = await response.json();
        console.log({ data });
        if (!response.ok) throw new Error(data.message);

        localStorage.removeItem("token");
        localStorage.removeItem("logged_in_user");
        tostTopEnd.fire({
          title: data.message,
          icon: "info",
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
      } catch (error) {
        tostTopEnd.fire({
          title: error.message,
          icon: "info",
        });
        console.log({ error: error.message });
      }
    });
    signupTag.href = "#";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar-container");
    navbar.classList.add("show");
  });
}

const tostTopEnd = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
});
export { navbarFunction, baseURL, tostTopEnd };
