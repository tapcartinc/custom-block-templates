const shopStore = 'STORE NAME GOES HERE'
const STOREFRONT_ACCESS_TOKEN = 'STOREFRONT API TOKEN'
const GRAPHQL_URL = `https://${shopStore}.myshopify.com/api/2024-04/graphql.json`

/*
     PRODUCT GROUPING LOGIC
     - Product grouping is done by accessing the colors.available metafield and then using those colors to append to the product handle.
     - This process generates a list of related products which is then passed to the Storefront API to retrieve the related products.  


     SWATCHING LOGIC
     - The swatching logic simply uses hexcodes from the CSS
     - NOTE - if new colors/hexcodes are added in your storefront, the CSS file must be updated with the new hexcode and CSS logic.
*/

let availableColors = []
let groupedProductHandles = []
let swatchContainer = document.getElementById('swatch-container')

document.getElementById('color-title').innerText = Tapcart.variables.product.metafields?.colors?.current

async function getProductGrouping(handle) {
  let rawAvailableColors = Tapcart.variables.product.metafields?.colors?.available
  const colorsArray = rawAvailableColors.split(',')
  let rawCurrentColor = Tapcart.variables.product.metafields?.colors?.current

  let sanitizedCurrentColor

  sanitizedCurrentColor = rawCurrentColor.toLowerCase() // Start with the raw color name

  // If color has a colon in it
  if (rawCurrentColor.includes(':')) {
    sanitizedCurrentColor = rawCurrentColor.split(':')[1].trim().toLowerCase()
  }

  // If color has a space in between
  else if (rawCurrentColor.includes(' ')) {
    sanitizedCurrentColor = rawCurrentColor.replace(/\s+/g, '-').toLowerCase()
  }

  colorsArray.forEach((color) => {
    let rawColorName = color
    let sanitizedColor = rawColorName.toLowerCase() // Start with the raw color name

    // If color has a colon in it
    if (rawColorName.includes(':')) {
      sanitizedColor = rawColorName.split(':')[1].trim().toLowerCase()
    }

    // If color has a space in between
    else if (rawColorName.includes(' ')) {
      sanitizedColor = rawColorName.replace(/\s+/g, '-').toLowerCase()
    }

    // Push the sanitized color to the array
    availableColors.push(sanitizedColor)
  })

  availableColors.forEach((color) => {
    let currentHandle = Tapcart.variables.product.handle
    let swatchValue = color
    let productCurrentColour = sanitizedCurrentColor

    const replacedHandle = currentHandle.replace(new RegExp(productCurrentColour.trim(), 'g'), swatchValue)

    groupedProductHandles.push(currentHandle.replace(productCurrentColour, swatchValue))
  })

  return groupedProductHandles
}

async function generateSwatches() {
  try {
    let groupedProductHandles = await getProductGrouping(Tapcart.variables.product.handle)

    let promises = groupedProductHandles.map((handle) => {
      const productQuery = () => `query {product(handle: "${handle}") {
          id,
          title,
          availableForSale
          handle
          metafield(namespace: "colors", key: "current") {
            namespace
            key
            value
          }
        }} `

      const GRAPHQL_BODY = () => {
        return {
          async: true,
          crossDomain: true,
          method: 'POST',
          headers: {
            'X-Shopify-Storefront-Access-Token': accessToken,
            'Content-Type': 'application/graphql',
          },
          body: productQuery(),
        }
      }

      return fetch(GRAPHQL_URL, GRAPHQL_BODY())
        .then((response) => response.json())
        .then((swatchObject) => {
          return swatchObject
        })
    })

    let swatchObjects = await Promise.all(promises)


    swatchObjects.forEach((swatch) => {
      let inFnIdGID = swatch.data.product.id
      let inFnIdRaw = inFnIdGID.lastIndexOf('/')
      let inFnId = inFnIdGID.slice(inFnIdRaw + 1)
      let rawColor = swatch.data.product.metafield.value.toLowerCase()
      let color = rawColor.replace(/:/g, '').trim().replace(/\s+/g, '-')
      let colorName = swatch.data.product.metafield.value

      const swatchEl = `<div class="swatch-circle col-Color-${color}" onclick="openProduct(${inFnId},'${colorName}')"></div>`

      swatchContainer.innerHTML += swatchEl
    })

    return swatchObjects
  } catch (error) {
    console.error('Error fetching color IDs:', error)
    // Handle the error accordingly
  }
}

generateSwatches()

function openProduct(id, colorName) {
  document.getElementById('color-title').innerText = colorName

  Tapcart.actions.openProduct({
    productId: `${id}`,
    isRelatedProduct: true, // optional, works only on PDPs
  })
}

// block-vendor:tapcart
// block-type:color-swatch
