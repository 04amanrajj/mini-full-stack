import { baseURL, navbarFunction, tostTopEnd } from "../global/utils.js";

const noteBox = document.getElementById("note-box");
const token = localStorage.getItem("token");

async function loadNotes() {
  noteBox.innerHTML = "";
  try {
    let response = await fetch(`${baseURL}/note`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (!response.ok)
      throw new Error("Token expired. Re-login to recreate token.");

    let data = await response.json();
    if (data.message && data.message.length) {
      data.message.forEach((element) => {
        const div = document.createElement("div");
        div.className = "note-item";

        div.innerHTML = `
              <div class="note-item">
                <h3>${element.title}</h3>
                <p><strong>Note:</strong> ${element.note}</p>
                <p><strong>Category:</strong> ${element.category}</p>
                <p><strong>Date:</strong> ${element.date}</p>
                <button class="note-delete">Delete</button>
              </div>
            `;
        noteBox.append(div);

        // Attach the delete event listener
        const deleteBtn = div.querySelector(".note-delete");
        deleteBtn.addEventListener("click", () => {
          deleteNote(element._id, div);
        });
      });
    } else {
      noteBox.innerHTML = `
        <pre>Create your first note...</pre>
      `;
    }
  } catch (error) {
    noteBox.innerHTML = `
        <pre>${error.message}</pre>
      `;
    console.log({ error: error.message });
  }
}

// Delete note function
async function deleteNote(noteId, noteElement) {
  try {
    const response = await fetch(`${baseURL}/note/${noteId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    const data = await response.json();

    if (!response.ok) throw new Error(data.message);
    tostTopEnd.fire({
      title: data.message,
      icon: "info",
    });
    noteElement.remove(); // Remove the note from the DOM
    loadNotes()
  } catch (error) {
    tostTopEnd.fire({
      title: error.message,
      icon: "error",
    });;
    console.log({ error: error.message });
  }
}

loadNotes();

// create new notes
const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("note-title").value;
  const note = document.getElementById("note-description").value;
  const category = document.getElementById("note-category").value;
  const date = new Date();

  const obj = {
    title,
    note,
    category,
    date,
  };

  try {
    let response = await fetch(`${baseURL}/note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(obj),
    });
    let data = await response.json();
    if (!response.ok) throw new Error(data.message);

    tostTopEnd.fire({
      title: data.message,
      icon: "info",
    });
    loadNotes();
  } catch (error) {
    tostTopEnd.fire({
      title: error.message,
      icon: "error",
    });
    console.log({ error: error.message });
  }
});

navbarFunction()
