const STOREFRONT_ACCESS_TOKEN = "{{Storefront Access Token Goes Here}}";
const GRAPHQL_URL ="{{Store Name Goes Here}}.myshopify.com/api/2022-10/graphql.json";
const productId = Tapcart.variables.product.id;

const productRecommendationQuery = () => `
  query {
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
      variants(first: 1) {
        edges {
          node {
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
      const placeholder = document.createElement("div");
      placeholder.classList.add("product-card");
      placeholder.innerHTML = `<div onclick="clickProduct('${
        product.id
      }')"><img src='${product.featuredImage.url}' alt='Product 1'><h3>${
        product.title
      }</h3><p></p><p>Price: $${product.priceRange.minVariantPrice.amount}</p>${
        compareAtPrice
          ? `<p class="compare">Compare At: $${compareAtPrice.amount}</p>`
          : ""
      }</div>`;

      if (i % 2 === 0) {
        row1.appendChild(placeholder);
      } else {
        row2.appendChild(placeholder);
      }
    });

    const carousel = document.querySelector("#product-carousel");
    carousel.appendChild(row1);
    carousel.appendChild(row2);
  });

function clickProduct(id) {
  const productId = id.split("/")[4];
  Tapcart.actions.openProduct({
    productId: productId,
  });
}
// block-vendor:shopify
// block-type:product-recommendations
