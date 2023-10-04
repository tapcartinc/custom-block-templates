const shopifyStore = "STORE NAME GOES HERE";
const accessToken = "STOREFRONT API TOKEN";

const selectedVariant = Tapcart.variables.product.selectedVariant.id;

/*
     PRODUCT GROUPING LOGIC
     - The PRODUCT TITLE is then used in a Storefront API fetch call to return products with a particular PRODUCT TAG i.e handle-RepMidShortTight
     - All in all - this product grouping example uses a combination of the PRODUCT TITLE and PRODUCT TAGS
*/


const regex = /^(.*?)(?: - )(.*)$/;
const inputString = Tapcart.variables.product.title;
const matches = inputString.match(regex);

let productTitle;
let colorName;

if (matches) {
  productTitle = matches[1].trim();
  colorName = matches[2].trim();
  console.log("Title:", productTitle); // Output: Rep Mid Short Tight
  console.log("Color:", colorName); // Output: Black-Azure Blue
} else {
  console.log("No matches found.");
}

const productTitleWithoutSpaces = productTitle.replace(/\s/g, "");

(async function shopifyProductFetch() {
  const titleSplit = productTitle;
  const titleColor = colorName;

  const STOREFRONT_ACCESS_TOKEN = accessToken;
  const GRAPHQL_URL = `https://${shopifyStore}.myshopify.com/api/2023-01/graphql.json`;

  const productQuery = `
    query searchProducts($query: String!) {
      products(first: 100, query: $query) {
        edges {
          node {
            onlineStoreUrl
            title
            handle
            id
            featuredImage {url}
          }
        }
      }
    }
  `;

  const GRAPHQL_BODY = JSON.stringify({
    query: productQuery,
    variables: {
      query: `tag:handle-${productTitleWithoutSpaces}`,
    },
  });

  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
    },
    body: GRAPHQL_BODY,
  });

  const data = await res.json();
  console.log(data);

/*
     SWATCHING LOGIC
     - The swatching logic of this example uses product image URLs to power the "color" of the swatch.  
     - The swatches are generated within a UL/LI/img strcuture and uses various data elements to pass data to other functionalites. 
     - Finally, all relevant data is passed to the openProduct function that contains the Tapcart openProduct action and UI update logic.  
*/

  let ulElement = document.querySelector(".colors-list");
  let colorNameEl = document.getElementById("color_name");
  colorNameEl.innerHTML = titleColor;

  data.data.products.edges.forEach((product) => {
    const productTitle = product.node.title;
    productTitle.split('-', 1)[0];
    const hyphenIndex = productTitle.indexOf('-');
    const productColor = productTitle.slice(hyphenIndex + 1).replace('-', ' ').trim();
    const variantId = product.node.id.split("/")[4];

    // Create an HTML string for the swatch element, using the formatted color for the image URL

    const swatches = `
          <li data-variantId = "${variantId}">
            <img class="circle" data-title="${productColor}" src='${product.node.featuredImage.url}?width=80&height=80&crop=center' onclick='openProduct(${variantId})'>
          </li>
          `;

    // Add the swatches HTML to the <ul> element
    ulElement.innerHTML += swatches;
  });

  Tapcart.registerEventHandler("product/updated", function (eventData) {
    eventData.product.selectedVariant.id;
  });
})(productTitle);

const openProduct = (vID) => {
  // Remove the current class from all other li elements
  const imgElements = document.querySelectorAll('img.circle');
  imgElements.forEach((img) => {
  img.classList.remove('current');
  });

  // Add the current class to the clicked img element
  const clickedLi = document.querySelector(`li[data-variantid="${vID}"]`);
  const clickedImg = clickedLi.querySelector('img');
  clickedImg.classList.add('current');

  // Change the color name:
  const colorNameElement = document.getElementById("color_name")
  colorNameElement.innerText = clickedImg.dataset.title

  // Open the product
  Tapcart.actions.openProduct({
    productId: `${vID}`,
    isRelatedProduct: true
  });
};


// block-vendor:tapcart
// block-type:color-swatch
