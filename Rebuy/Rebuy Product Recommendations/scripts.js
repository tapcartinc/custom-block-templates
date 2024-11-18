// Change these Values here //

let rebuyAPIKey = "YOUR REBUY API KEY";
let recommendedProductsEndpoint = "products/recommended";
let customEndpoint = "custom/id/120804/edit";
let pdpEndpoint = "custom/id/142103/edit";
let endpoint = recommendedProductsEndpoint; // copy the above variable as the value

// Choose how many cards to display
let limit = 4;

// Is this a cart block
let isCartBlock = false;

// Is this a PDP block
let isPDPBlock = true;

// Is this a Multi Page block
let isMultiPage = false;
let multiPageProductId = "7129392382115";

// Add to Cart or Open Product functionality?
let typeOfBlock = "openProduct"; // openProduct or addToCart

// Add to Cart background color
let addToCartColor = "rgb(253,162,150)";

// Add to Cart text
let addToCartText = "Add to Cart";

// Caution when editing the below code //

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

let theProductId;
if (isCartBlock) {
  theProductId = cartProductIds[0];
} else if (isPDPBlock) {
  theProductId = Tapcart.variables.product.id;
}

Tapcart.registerEventHandler("cart/updated", function (eventData) {
  cartItems = eventData.cart.items;

  cartItems.forEach((item) => {
    cartProductIds.push(item.productId);
  });

  randomIndex = Math.floor(Math.random() * cartProductIds.length);
  randomCartProductId = cartProductIds[0];

  generateProductRecommendations(cartItems[0].productId);
});

generateProductRecommendations(theProductId);

async function generateProductRecommendations(id) {
  try {
    const response = await fetchProductRecommendations(id);
    const filteredProducts = filterOutExcludedProducts(response.data);
    const productCards = createProductCards(filteredProducts);
    updateProductCarousel(productCards);
    logProductCards();
  } catch (error) {
    console.error("Error generating product recommendations:", error);
  }
}

async function fetchProductRecommendations(id) {
  const url = `https://rebuyengine.com/api/v1/${endpoint}?shopify_product_ids=${id}&limit=${limit}&filter_oos=yes&context=default&key=${rebuyAPIKey}`;
  const response = await fetch(url, options);
  return response.json();
}

function filterOutExcludedProducts(products) {
  const excludedProductId = "gid://shopify/Product/7237338529932";
  return products.filter((product) => product.admin_graphql_api_id !== excludedProductId);
}

function createProductCards(products) {
  return products.map((product) => createProductCard(product)).join("");
}

function createProductCard(product) {
  const productHasVariants = product.variants.length > 1;
  const variantOptions = productHasVariants ? createVariantOptions(product.variants) : "";
  const productDetails = extractProductDetails(product);
  const pricesDisplay = renderPriceElement(productDetails);

  return `
    <div class="product-card" data-productid="${productDetails.productId}" data-variantid="${productDetails.variantId}" ${typeOfBlock === "openProduct" ? `onclick="openProduct('${productDetails.productId}')"` : ""}>
      <div class="product-image">
        <img src="${productDetails.productImage}" ${isPDPBlock ? `class="pdp-image"` : ""}/>
        <div class="${isPDPBlock ? `pdp-product-title` : `product-title`}">${productDetails.productTitle}</div>
        <div class="product-price">
          ${pricesDisplay}
        </div>
      </div>
      ${typeOfBlock === "addToCart" ? createAddToCartSection(productHasVariants, variantOptions, productDetails.variantId) : ""}
    </div>
  `;
}

function createVariantOptions(variants) {
  return variants.map((variant) => `<option data-variantid="${variant.admin_graphql_api_id.split("/").pop()}">${variant.title}</option>`).join("");
}

function extractProductDetails(product) {
  const variant = product.variants[0];
  return {
    productId: product.id,
    variantId: variant.admin_graphql_api_id.split("/").pop(),
    productTitle: product.title,
    productImage: product.image.src,
    productPrice: variant.price,
    compareAtPrice: variant.compare_at_price,
  };
}

function renderPriceElement({ productPrice, compareAtPrice }) {
  if (compareAtPrice && compareAtPrice !== productPrice) {
    return `
      <span style="color: red">${formatter.format(productPrice)}</span>
      <span style="text-decoration: line-through">${formatter.format(compareAtPrice)}</span>
    `;
  } else {
    return `<span>${formatter.format(productPrice)}</span>`;
  }
}

function createAddToCartSection(hasVariants, variantOptions, variantId) {
  return `
    <div class="product-info">
      ${hasVariants ? `<div class="product-variants"><select>${variantOptions}</select></div>` : ""}
    </div>
    <div class="container">
      <button class="add-to-cart" style="background-color: ${addToCartColor}" onClick="addToCart(event, '${variantId}')">${addToCartText}</button>
    </div>
  `;
}

function setThemeColors(){
  
}


function updateProductCarousel(productCards) {
  productCarouselElement.innerHTML = productCards;
}

function logProductCards() {
  document.querySelectorAll(".product-card").forEach((card) => console.log(card));
}

function addToCart(event, variantId) {

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
      },
    ],
  });
}

function openProduct(id) {
  Tapcart.actions.openProduct({
    productId: id,
  });
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

function removePlaceholders() {
  // Attempt to select the skeleton container element
  const skeletonContainer = document.querySelector(".timeline-wrapper");
  console.log(document.querySelector(".main"))
  console.log("Skeleton Container", skeletonContainer);
  
  // Check if the skeleton container exists before attempting to modify it
  if (skeletonContainer) {
    skeletonContainer.style.display = 'none'; // Clear the content, assuming this is what you intend
  } else {
    console.error("Skeleton container not found.");
  }
}
