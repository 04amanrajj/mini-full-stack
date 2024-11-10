// import { baseURL } from "../global/utils.js";
const baseURL = "http://localhost:3400/";
const noteBox = document.getElementById("note-box");
const token = localStorage.getItem("token");

async function loadNotes() {
  try {
    let response = await fetch(baseURL + "note", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    let data = await response.json();
    noteBox.innerHTML = `
      <pre>${data.data || "Token expired re-login to recreate token"}</pre>`;
  } catch (error) {
    console.log({ error: error.message });
  }
}

loadNotes();
