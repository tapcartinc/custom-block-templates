const options = { method: 'GET', headers: { accept: 'application/json' } }
const siteId = 'your-site-id'
const productId = Tapcart.variables.product.id

// Determine currecy symbol

let currency = Tapcart.variables.cart.currency
let currencySymbol = determineCurrencySymbol(currency)

// API call to fetch product recommendations from Search Spring

fetch(`https://${siteId}.a.searchspring.io/boost/${siteId}/recommend?tags=cross-sell&product=${productId}&limits=8`, options)
  .then((response) => response.json())
  .then((response) => {
    const recommendationsDiv = document.querySelector('.recommendations')
    response[0].results.forEach((product) => {
      let productCard = document.createElement('div')
      productCard.className = 'product-card'

      // Add onclick event to the card
      productCard.onclick = () => {
        Tapcart.actions.openProduct({
          productId: product.id,
        })
      }

      let productImage = document.createElement('img')
      productImage.className = 'product-image'
      productImage.src = product.mappings.core.imageUrl

      let productTitle = document.createElement('p')
      productTitle.className = 'product-title'
      productTitle.textContent = product.mappings.core.name

      let productPrice = document.createElement('p')
      productPrice.className = 'product-price'
      productPrice.textContent = `${currencySymbol}${product.mappings.core.price.toFixed(2)}`

      let productSku = document.createElement('p')
      productSku.className = 'product-sku'
      productSku.textContent = `SKU: ${product.mappings.core.sku}`

      productCard.append(productImage, productTitle, productPrice)
      recommendationsDiv.appendChild(productCard)
    })
  })
  .catch((err) => console.error(err.message))

function determineCurrencySymbol(currency) {
  let symbol

  switch (currency) {
    case 'GBP':
      symbol = '£'
      break
    case 'USD':
      symbol = '$'
      break
    case 'euro':
      symbol = '€'
      break
    case 'yen':
      symbol = '¥'
      break
    case 'won':
      symbol = '₩'
      break
    case 'yuan':
      symbol = '元'
      break
    default:
      symbol = '$'
  }

  return symbol
}

// block-vendor:ssearchspring
//block-type:product-recommendations
