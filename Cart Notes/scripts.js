let addNoteBtn = document.querySelector("label");
let accordion = document.querySelector(".accordion-panel");
addNoteBtn.addEventListener("click", () => {
  accordion.classList.toggle("active");
  addNoteBtn.classList.toggle("active");
});

// Cart Note on change handler

let textArea = document.querySelector("textarea");
let addToCartBtn = document.querySelector("button");
let cartNote = textArea.value;

function addCartNote() {
  let textArea = document.querySelector("textarea");
  let addToCartBtn = document.querySelector("button");
  let cartNote = textArea.value;

  if (cartNote && accordion.classList.contains("active")) {
    Tapcart.actions.updateCartNote({
      note: cartNote,
    });
    addToCartBtn.innerText = "Cart Note updated!";
    setTimeout(() => {
      addToCartBtn.innerText = "Add Note";
      accordion.classList.toggle("active");
    }, 2000);
  } else if (!cartNote && accordion.classList.contains("active")) {
    addToCartBtn.innerText = "Add a cart note";
  }

  setTimeout(() => {
    addToCartBtn.innerText = "Add Note";
  }, 2000);
}
