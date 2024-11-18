// You may want to change the value of the variables below:

let freeShippingText = "YOUR BAG QUALIFIES FOR FREE SHIPPING";
let progressBarColor = Tapcart.variables.theme?.tokens.colors.coreColors.brandColorPrimary || "#000000";

const freeShippingThresholds = {
  USD: 60,
  CAD: 70,
  GBP: 40,
  EUR: 50,
};

// Caution!!! Editing the code below may break the functionality of the script //

function handleCartUpdate() {
  const cart = Tapcart.variables?.cart;
  const locale = normalizeLocale(Tapcart.variables.device.locale);
  const currencySymbolElement = document.querySelector(".currency_symbol");
  const progressBarElement = document.querySelector(".minicart__progress-bar");
  progressBarElement.style.backgroundColor = progressBarColor;

  if (!cart) return;

  const cartTotal = cart.subtotal;
  const currencyCode = cart.currency;

  setCurrencySymbol(locale, currencyCode, currencySymbolElement);
  displayFreeShippingProgress(cartTotal, currencyCode, locale);
}

function normalizeLocale(locale) {
  return locale.replace("_", "-");
}

function setCurrencySymbol(locale, currencyCode, element) {
  const symbol = getCurrencySymbol(locale, currencyCode);
  if (element) element.innerHTML = symbol;
}

function getCurrencySymbol(locale, currencyCode) {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "symbol",
  });
  const parts = formatter.formatToParts(0);
  return parts.find((part) => part.type === "currency")?.value || "";
}

function displayFreeShippingProgress(cartTotal, currencyCode, locale) {

  const targetAmount = freeShippingThresholds[currencyCode];
  console.log("Target Amount", targetAmount);
  const remainingAmount = targetAmount ? targetAmount - cartTotal : null;

  if (remainingAmount === null) {
    hideShippingTracker();
    return;
  }

  const currencySign = getCurrencySymbol(locale, currencyCode);
  document.querySelector(
    ".final-amount"
  ).innerHTML = `${currencySign}${targetAmount}`;

  cartTotal >= targetAmount
    ? displayQualifiedForFreeShipping()
    : updateShippingProgress(cartTotal, targetAmount, locale, remainingAmount);
}

function hideShippingTracker() {
  document.querySelector(".shipping-main-tracker").style.display = "none";
}

function displayQualifiedForFreeShipping() {
  document.querySelector("#progress").style.width = "100%";
  document.querySelector(".free-shipping-text").innerHTML = freeShippingText;
}

function updateShippingProgress(
  cartTotal,
  targetAmount,
  locale,
  remainingAmount
) {
  const progressPercentage = (cartTotal / targetAmount) * 100;
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: Tapcart.variables?.cart?.currency,
    currencyDisplay: "symbol",
  });
  document.querySelector("#progress").style.width = `${progressPercentage}%`;
  document.querySelector(
    ".free-shipping-text"
  ).innerHTML = `YOU ARE ${formatter.format(
    remainingAmount.toFixed(2)
  )} AWAY FROM FREE SHIPPING`;
}

handleCartUpdate();

Tapcart.registerEventHandler("cart/updated", handleCartUpdate);
