const { baseURL } = require("../global/utils");
const textBox = document.querySelector(".text-showcase");
const token = localStorage.getItem("token");
try {
  let response = await fetch(dataURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  let data = await response.json();
  textBox.innerHTML = `
    <pre>${data.data || "Token expired re-login to recreate token"}</pre>`;
} catch (error) {
  console.log({ error: error.message });
}
