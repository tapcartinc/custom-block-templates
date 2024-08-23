const STOREFRONT_ACCESS_TOKEN = 'Storefront Access Token Goes Here'
const storeDomain = 'Store Name Goes Here'

const GRAPHQL_URL = `https://${storeDomain}.myshopify.com/api/2024-04/graphql.json`
const productId = Tapcart.variables.product.id

// Change singleRow to true to display the product recommendations in a single row
let singleRow = true

// Type either "pound", "dollar", "euro", "yen", "yuan", or "won" to change the currency symbol
let currency = 'dollar'


// Function to format a number as currency
let currencyCode = Tapcart.variables.cart.currency;
let locale = Tapcart.variables.device.locale.replace('_', '-')
let countryCode = locale.split('-')[1].toUpperCase()
const formatter = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: currencyCode,
  currencyDisplay: "symbol",
});

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
`

const GRAPHQL_BODY = () => {
  return {
    async: true,
    crossDomain: true,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      'Content-Type': 'application/graphql',
    },
    body: productRecommendationQuery(),
  }
}

function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling)
}

fetch(GRAPHQL_URL, GRAPHQL_BODY())
  .then((res) => res.json())
  .then((productResponse) => {
    const productRecommendations = productResponse.data.productRecommendations

    const row1 = document.createElement('div')
    row1.classList.add('row')
    const row2 = document.createElement('div')
    row2.classList.add('row')

    productRecommendations.forEach((product, i) => {
      const compareAtPrice = product.variants.edges[0].node.compareAtPrice
      console.log(compareAtPrice)
      const rawPriceString = product.priceRange.minVariantPrice.amount
      const priceNum = parseFloat(rawPriceString).toFixed(2)
      const compareAtPriceNum = compareAtPrice ? parseFloat(compareAtPrice.amount).toFixed(2) : null
      const placeholder = document.createElement('div')
      placeholder.classList.add('product-card')
      placeholder.addEventListener('click', () => clickProduct(product.id))
      placeholder.innerHTML = `
          <img src='${product.featuredImage.url}' alt='Product 1'>
          <p class="product-title">${product.title}</p>
          <div class="prices">
            <p class="price">${formatter.format(priceNum)}</p> 
            ${compareAtPrice && compareAtPrice.amount !== '0.0' && compareAtPrice.amount !== rawPriceString
          ? `<p class="compare">${formatter.format(compareAtPriceNum)}</p>`
          : ''}
        </div>`

      let row = singleRow || i % 2 === 0 ? row1 : row2
      row.appendChild(placeholder)
    })

    const carousel = document.querySelector('#product-carousel')
    carousel.appendChild(row1)
    carousel.appendChild(row2)
  })

function clickProduct(id) {
  const productId = id.split('/')[4]
  Tapcart.actions.openProduct({
    productId: productId,
  })
}
// block-vendor:shopify
// block-type:product-recommendations
