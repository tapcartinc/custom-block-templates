let rebuyAPIKey = "REBUY API KEY";

let useRebuyRecommendedProducts = true; // or false

let dataSourceId = "120804";

// Filtered product titles, normally used to exclude Shipping Protection products
let FILTERED_PRODUCT_TITLES = ["Shipping Protection", "Route"];

let limit = 4;

let blockTitle = "You may also like";

let isImportedFont = true; // Fonts like Google Fonts, Adobe Fonts, CDN Fonts, etc.  // or false if you are using a custom font from Shopify Contents

let fontName = "";

let fontURL = "";

let useAddToCartButton = true; // or false

let addToCartText = "Add";

// !!Caution when editing the below code!! //

let addToCartColor = Tapcart.variables.theme?.tokens.colors.buttonColors.primaryFill || "#000000";

let salePriceColor = Tapcart.variables.theme?.tokens.colors.textColors.salePriceText || "red";

let compareAtPriceColor = Tapcart.variables.theme?.tokens.colors.textColors.strikethroughPriceText || "grey";

// Set block title
document.querySelector(".title").innerText = blockTitle;

// Set custom font
setCustomFont(fontURL, fontName, isImportedFont);

let endpoint;

if (useRebuyRecommendedProducts) {
  endpoint = "products/recommended";
} else {
  endpoint = `custom/id/${dataSourceId}`;
}

// Function to format a number as currency
let currencyCode = Tapcart.variables.cart.currency;

let locale = Tapcart.variables.device.locale.replace("_", "-");

const formatter = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: currencyCode,
  currencyDisplay: "symbol",
});

const options = { method: "GET", headers: { accept: "application/json" } };

let productCarouselElement = document.querySelector(".product-carousel");

// Execute the Network placeholder
executePlaceholder();

let cartProductIds = [];

let cartItems = Tapcart.variables.cart?.items;

cartItems.forEach((item) => {
  cartProductIds.push(item.productId);
});

// Generate a random index
let randomIndex = Math.floor(Math.random() * cartProductIds.length);
// let randomCartProductId = cartProductIds[randomIndex];

let randomCartProductId = cartProductIds[0];

Tapcart.registerEventHandler("cart/updated", function (eventData) {
  cartItems = eventData.cart.items;

  cartItems.forEach((item) => {
    cartProductIds.push(item.productId);
  });

  randomIndex = Math.floor(Math.random() * cartProductIds.length);

  randomCartProductId = cartProductIds[0];

  generateProductRecommendations(cartItems[0].productId);
});

generateProductRecommendations(randomCartProductId);

async function generateProductRecommendations(id) {
  fetch(`https://rebuyengine.com/api/v1/${endpoint}?shopify_product_ids=${id}&limit=${limit}&filter_oos=yes&context=default&key=${rebuyAPIKey}`, options)
    .then((response) => response.json())
    .then((response) => {
      let returnedProducts = response.data;
      let productCards = "";
      let filteredReturnedProducts = returnedProducts.filter((product) => {
        let title = product.title.trim().toLowerCase();
        return !FILTERED_PRODUCT_TITLES.some((variantTitle) => title === variantTitle.trim().toLowerCase());
      });

      filteredReturnedProducts.forEach((product) => {
        let productHasVariants = product.variants.length > 1;
        let options;
        if (productHasVariants) {
          options = product.variants
            .map((variant) => {
              return `<option data-variantcompareat=${variant.compare_at_price} data-variantprice=${variant.price} data-variantid=${variant.admin_graphql_api_id.split("/").pop()}>${variant.title}</option>`;
            })
            .join("");
        }

        let productId = product.id;
        let variantId = product.variants[0].admin_graphql_api_id.split("/").pop();
        let productTitle = product.title;
        let productImage = product.image.src;
        let productPrice = product.variants[0].price;
        let compareAtPrice = product.variants[0].compare_at_price;
        productCards += `
        <div class="product-card" data-productid="${productId}" data-variantid="${variantId}" ${!useAddToCartButton ? `onclick="openProduct('${productId}')"` : ""}>
          <div class="product-image">
            <img src="${productImage}" />
            <div class="product-title">${productTitle}</div>
            <div class="product-price">
              <span class="price" style="${compareAtPrice && compareAtPrice != "0.00" ? `color: ${salePriceColor};` : ""}">${formatter.format(productPrice)}</span>
              <span class="compare-at-price"style="text-decoration: line-through; color:${compareAtPriceColor}">${compareAtPrice && compareAtPrice != "0.00" ? formatter.format(compareAtPrice) : ""}</span>
            </div>
          </div>
          ${
            useAddToCartButton
              ? `
            <div class="product-info">${productHasVariants ? `<div class="product-variants"><select onchange="onVariantChange(event)">${options}</select></div>` : ""}</div>
            <div class="container"><button class="add-to-cart" style="background-color: ${addToCartColor};" onClick="addToCart(event, '${variantId}')">${addToCartText}</button></div>
          `
              : ""
          }
        </div>
      `;
      });

      // Replace the placeholder cards with the actual product cards
      productCarouselElement.innerHTML = productCards;

      let allProductCards = document.querySelectorAll(".product-card");

    })
    .catch((err) => console.error(err));
}

window.onVariantChange = function onVariantChange(event) {
  let price = event.target.selectedOptions[0].dataset.variantprice;
  let compareAtPrice = event.target.selectedOptions[0].dataset.variantcompareat;

  let productCard = event.target.closest(".product-card");
  let priceElement = productCard.querySelector(".price");
  let compareAtPriceElement = productCard.querySelector(".compare-at-price");

  priceElement.innerText = formatter.format(price);
  if (compareAtPrice != "null") {
    priceElement.style.color = salePriceColor;
  } else {
    priceElement.style.color = "black";
  }
  compareAtPriceElement.innerText = compareAtPrice != "null" ? formatter.format(compareAtPrice) : "";
};

function addToCart(event, variantId) {
  // let productId = event.currentTarget.dataset.productid;

  let id;
  let button = event.target;
  let productCard = button.closest(".product-card");
  let variantDropdown = productCard.querySelector(".product-variants select");
  let selectedVariantId = variantDropdown ? variantDropdown.selectedOptions[0].dataset.variantid : null;

  if (selectedVariantId === null) {
    id = variantId;
  } else {
    id = selectedVariantId;
  }

  Tapcart.actions.addToCart({
    lineItems: [
      {
        variantId: id,
        quantity: 1,
        attributes: [
          {
            key: "_source",
            value: "Rebuy",
          },
          {
            key: "_attribution",
            value: "Rebuy Tapcart Product",
          },
        ],
      },
    ],
  });
}

function openProduct(id) {
  Tapcart.actions.openProduct({
    productId: id,
  });
}

function setCustomFont(url, name, isFontImported) {
  if (!url || !name) {
    return;
  }

  if (isFontImported) {
    const link = document.createElement("link");
    link.href = url;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.innerHTML = `
      * {
        font-family: '${name}', sans-serif !important;
      }
    `;

    // Append the style to the document head
    document.head.appendChild(style);
  } else {
    // Create a new style element
    const style = document.createElement("style");

    // Set the innerHTML to the @font-face rule
    style.innerHTML = `
      @font-face {
        font-family: '${name}';
        src: url('${url}') format('woff2');
      }
      * {
        font-family: '${name}', sans-serif !important;
      }
    `;

    // Append the style to the document head
    document.head.appendChild(style);
  }
}

function executePlaceholder() {
  // Add 5 placeholder cards to the carousel
  for (let i = 0; i < 5; i++) {
    productCarouselElement.innerHTML += `<div class="timeline-wrapper">
  <div class="timeline-item">
    <div class="animated-background facebook">
      <div class="background-masker header-top"></div>
      <div class="background-masker header-left"></div>
      <div class="background-masker header-right"></div>
      <div class="background-masker header-bottom"></div>
      <div class="background-masker subheader-left"></div>
      <div class="background-masker subheader-right"></div>
      <div class="background-masker subheader-bottom"></div>
      <div class="background-masker content-top"></div>
      <div class="background-masker content-first-end"></div>
      <div class="background-masker content-second-line"></div>
      <div class="background-masker content-second-end"></div>
      <div class="background-masker content-third-line"></div>
      <div class="background-masker content-third-end"></div>
    </div>
  </div>
</div>
  `;
  }
}
