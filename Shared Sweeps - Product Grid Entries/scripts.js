// Configuration

const STOREFRONT_ACCESS_TOKEN =  "XXXXXXXXXXXXXXXXXXXXX" // get your storefront access token by going to Shopify Admin > Apps and Sales Channels > Develop Apps

const app_store_url = "yourstore.myshopify.com"; // your admin store URL

const collectionHandle = "all"; // your collection page handle

const perPageItemCount = 8; // number of products to show

const app_is_entries_icon = 'n';   // enable or disable the icon y=Yes n=No

const app_is_multiplier_enabled  = 'y'; // enable or disable the multiplier value from showing y=Yes n=No

const app_multiplier_background_color  = 'green'; // multiplier background color

const app_multiplier_font_color  = 'white'; // multiplier font color  

// End Configuration
 


// Do not make changes below this line

const GRAPHQL_URL = "https://" + app_store_url + "/api/2022-10/graphql.json";
const productQuery = () => `query {
    collection(handle:"${collectionHandle}") {
        handle 
        title
        products(first:${perPageItemCount}) {   
        edges {
          node {
            id
            title
            handle
            tags
            featuredImage{
              src
            }
            variants(first: 1) {
              edges {
                cursor
                node {
                  id
                  title
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
}`;

const GRAPHQL_BODY = () => {
  return {
    async: true,
    crossDomain: true,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
      "Content-Type": "application/graphql",
    },
    body: productQuery(),
  };
};

fetch(GRAPHQL_URL, GRAPHQL_BODY())
  .then((res) => res.json())
  .then((productResponse) => {
    if (productResponse.data.collection != null) {
      var products = productResponse.data.collection.products.edges;

      let productGridArea = document.querySelector(".product-grid-area");
      let multiplier; // current multiplier
      products.forEach(function (product) {
        
        var fullPid = product.node.id.split("/").pop()
        const tag = product.node.tags.find(tag => tag.startsWith("multiplier_"));
        multiplier = tag ? parseInt(tag.split("_")[1], 10) : 1;

        let productWrapper = `
        
        <div class="product-wrapper">
            <a href="#" onclick="viewProduct(${fullPid});" data-pid="${fullPid}" class="product-link openProduct">
                <div class="product-image">
                <img src="${product.node.featuredImage.src}">
                </div>
                <p>${product.node.title}</p>
                <span class="price-wrapper">$${product.node.variants.edges[0].node.price.amount}</span>
                <div class="entries-container">
                <div class="total-entries">
                    ${app_is_entries_icon == "y" ? '<i class="fa-solid fa-ticket"></i>' : ''}
                    <span class="entries-number" data-bonuscount="0">${Math.floor(product.node.variants.edges[0].node.price.amount * multiplier)}</span>
                    <span class="label-area">Entries</span>
                </div>
                ${app_is_multiplier_enabled == "y" ? `<div class="multiplier" style="color:${app_multiplier_font_color};background-color:${app_multiplier_background_color}">${multiplier}X</div>` : ''}
                </div>
            </a>
        
        `
        productGridArea.innerHTML += productWrapper;
        document.getElementById("api_products").style.display = "flex";
      });
    }
  });
function viewProduct(id) {
  Tapcart.actions.openProduct({
    productId: id,
  });
}
