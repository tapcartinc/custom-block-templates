const programName = "Tandym Pay"; // <replace with merchant specific program name>
const brandImgSrc = "https://tandym-api.s3.amazonaws.com/"; // <replace with merchant specific filename>.svg
const callToActionText = "Save 15% on your first order with Tandym Pay.";

function setHTMLElementAssets() {
  document.querySelector(".tandym_widget_container img").src = brandImgSrc;
  document.querySelector(".tandym_widget_container img").altText = programName;
  document.querySelector(".program-name").innerText = programName;
  document.querySelector(".cta strong").innerText = callToActionText;
}

const main = () => {
  setHTMLElementAssets();
};

main();
