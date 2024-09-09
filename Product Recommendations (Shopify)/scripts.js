// CHANGE these values below to fit your needs

// Enter your Shopify Storefront API Access Token
const STOREFRONT_ACCESS_TOKEN = 'Storefront Access Token Goes Here'

// Enter your Store domain
const storeDomain = 'Store Name Goes Here'

// Set to true to display the product recommendations in a single row.  False for double row
let singleRow = true;

// Is this a cart block
let isCartBlock = true;

// Is this a Multi Page block
let isMultiPage = false;

let multiPageProductId = "7129392382115"

// Add to Cart or Open Product functionality?
let typeOfBlock = "openProduct"; // openProduct or addToCart

// Add to Cart background color
let addToCartBgColor = Tapcart.variables.theme.tokens.colors.buttonColors.primaryFill || "black";

// Add to Cart text color
let textColor = Tapcart.variables.theme.tokens.colors.textColors.primaryColor || "white";

// Price color
let priceColor = Tapcart.variables.theme.tokens.colors.textColors.priceText || "black";

// Sale Price color
let salePriceColor = Tapcart.variables.theme.tokens.colors.textColors.salePriceText || "red";

// Compare at Price strike through color
let compareAtPriceColor = Tapcart.variables.theme.tokens.colors.textColors.strikethroughPriceText || "grey";

// CAUTION Editing the code below this line!!

// Function to format a number as currency
let currencyCode = Tapcart.variables.cart.currency;

let locale = Tapcart.variables.device.locale.replace('_', '-')

let countryCode = locale.split('-')[1].toUpperCase()

const formatter = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: currencyCode,
  currencyDisplay: "symbol", 
});

const GRAPHQL_URL = `https://${storeDomain}.myshopify.com/api/2024-04/graphql.json`;

let productId = Tapcart.variables?.product?.id;

let cartItems = Tapcart.variables.cart?.items;

let cartProductIds = [];

if (isCartBlock) {
  cartItems.forEach((item) => {
    cartProductIds.push(item.productId);

    // To Generate a random index

    // let randomIndex = Math.floor(Math.random() * cartProductIds.length);
    // let randomCartProductId = cartProductIds[randomIndex];

    productId = cartProductIds[0];
  });
}

if(isMultiPage){
  productId = multiPageProductId
}

const productRecommendationQuery = () => `
   query @inContext(country: ${countryCode}){
    productRecommendations(productId: "gid://shopify/Product/${productId}") {
      id
      title
      priceRange {
        minVariantPrice {
          amount
        }
      }
      onlineStoreUrl
      description
      featuredImage {
        url
      }
      variants(first: 50) { 
        edges {
          node {
            id
            title
            availableForSale
            compareAtPrice {
              amount
            }
          }
        }
      }
    }
  }
`;

const GRAPHQL_BODY = () => {
  return {
    async: true,
    crossDomain: true,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
      "Content-Type": "application/graphql",
    },
    body: productRecommendationQuery(),
  };
};

function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

fetch(GRAPHQL_URL, GRAPHQL_BODY())
  .then((res) => res.json())
  .then((productResponse) => {

    const productRecommendations = productResponse.data.productRecommendations;

    const row1 = document.createElement("div");
    row1.classList.add("row");
    const row2 = document.createElement("div");
    row2.classList.add("row");

    productRecommendations.forEach((product, i) => {
      const compareAtPrice = product.variants.edges[0].node.compareAtPrice;
      const rawPriceString = product.priceRange.minVariantPrice.amount;
      const priceNum = parseFloat(rawPriceString);
      const compareAtPriceNum = compareAtPrice ? parseFloat(compareAtPrice.amount) : null;
    
      const placeholder = document.createElement("div");
      let variants = product.variants.edges;
    
      placeholder.classList.add("product-card");
      if (typeOfBlock === "openProduct") {
        placeholder.addEventListener("click", () => clickProduct(product.id));
      }
    
      if (typeOfBlock === "addToCart") {
        placeholder.innerHTML = `
          <img src='${product.featuredImage.url}' alt='Product 1'>
          <p class="product-title">${product.title}</p>
          <div class="variants">
            <select class="variant-select"></select>
          </div>
          <div class="prices">
            <p class="price">${formatter.format(priceNum)}</p> ${
              compareAtPriceNum && compareAtPriceNum !== 0.0 && compareAtPriceNum !== priceNum
                ? `<p class="compare">${formatter.format(compareAtPriceNum)}</p>`
                : ""
            }
          </div>
          <div class="add-to-cart"><button onclick="addToCart(this.parentElement.previousElementSibling.previousElementSibling.querySelector('.variant-select').value)">Add to Cart</button></div>
        `;
      } else {
        placeholder.innerHTML = `
          <img src='${product.featuredImage.url}' alt='Product 1'>
          <p class="product-title">${product.title}</p>
          <div class="prices">
            <p class="price">${formatter.format(priceNum)}</p> ${
              compareAtPriceNum && compareAtPriceNum !== 0.0 && compareAtPriceNum !== priceNum
                ? `<p class="compare">${formatter.format(compareAtPriceNum)}</p>`
                : ""
            }
          </div>`;
      }
    
      let row = singleRow || i % 2 === 0 ? row1 : row2;
      row.appendChild(placeholder);
    
      if (typeOfBlock === "addToCart") {
        let selectElement = placeholder.querySelector(".variant-select");
        variants.forEach((variant) => {
          if (variant.node.availableForSale) {
            let option = document.createElement("option");
            option.text = variant.node.title;
            option.value = variant.node.id.split("/").pop();
            selectElement.appendChild(option);
          }
        });
      }
    });

    const carousel = document.querySelector("#product-carousel");
    carousel.appendChild(row1);
    carousel.appendChild(row2);

    if (isCartBlock) {
      // Alter CSS IF Cart block
      let allImages = document.querySelectorAll("img");
      allImages.forEach((image) => {
        image.style.height = "9rem";
      });
      document.querySelector("label").style.marginTop = "5px";
    }
  }).then(() => {
    setThemeColors();
  })

function clickProduct(id) {
  const productId = id.split("/")[4];
  Tapcart.actions.openProduct({
    productId: productId,
  });
}

function addToCart(variantId) {

  Tapcart.actions.addToCart({
    lineItems: [
      {
        variantId: variantId,
        quantity: 1,
      },
    ],
  });
}

function setThemeColors() {
  const allPrices = document.querySelectorAll(".price");
  allPrices.forEach((price) => {
    price.style.color = priceColor;
  });

  const allComparePrices = document.querySelectorAll(".compare");
  allComparePrices.forEach((compare) => {
    compare.style.color = compareAtPriceColor;
  });

  const allAddToCartButtons = document.querySelectorAll(".add-to-cart button");
  allAddToCartButtons.forEach((button) => {
    button.style.backgroundColor = addToCartBgColor;
    button.style.color = textColor;
  });
}

// block-vendor:shopify
// block-type:product-recommendations
