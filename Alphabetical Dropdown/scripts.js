const accordionHeaders = document.querySelectorAll(".accordion-header");
const accordionPanels = document.querySelectorAll(".accordion-panel");

// Add a click event listener to each header
accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    // Toggle the active class on the header
    header.classList.toggle("active");
    // Get the panel associated with the header
    const panel = header.nextElementSibling;
    // Toggle the active class on the panel
    panel.classList.toggle("active");
  });
});
