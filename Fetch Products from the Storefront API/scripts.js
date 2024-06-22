const STOREFRONT_ACCESS_TOKEN = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
const GRAPHQL_URL = "https://kenyons-tapcart-boutique.myshopify.com/api/2024-04/graphql.json";
const productIds = `["gid://shopify/Product/7444358463640"]`;
const productQuery = () => `
  query {
    nodes(ids: ${productIds}) { 
      ... on Product {
        id
        title
        handle
        tags
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
    body: productQuery(),
  };
};

fetch(GRAPHQL_URL, GRAPHQL_BODY())
  .then((res) => res.json())
  .then((productResponse) => {
    console.log(productResponse);
  });

// block-vendor:tapcart
// block-type:utility-storefront-api-fetch