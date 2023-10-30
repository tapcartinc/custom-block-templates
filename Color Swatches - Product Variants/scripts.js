let productTitle = Tapcart.variables.product.title
let productId = Tapcart.variables.product.id
let selectedVariantId = Tapcart.variables.product.selectedVariant.id
let variants = Tapcart.variables.product.variants

Tapcart.registerEventHandler('product/updated', function (eventData) {
  productTitle = eventData.product.title
  selectedVariantId = eventData.product.selectedVariant.id
  productId = eventData.product.id
  variants = eventData.product.variants
})

let swatchContainer = document.getElementById('swatch-container')

document.getElementById('color-title').innerText = Tapcart.variables.product.options[0].values[0]

let availableColors = Tapcart.variables.product.options[0].values

let result = availableColors.map((color) => {
  return variants.find((item) => item.title.startsWith(color))
})

result.forEach((product, index) => {
  let rawColor = product.title
  let color = rawColor.split(' / ')[0] // "Orange"
  let swatchColor = color.toLowerCase().replace(/ /g, '-')
  let variantId = product.id

  const swatch = `<div class="swatch-circle ${swatchColor}" onclick="openProduct('${color}','${variantId}','${productId}')"></div>`

  swatchContainer.innerHTML += swatch
})

function openProduct(color, variantId, productId) {
  document.getElementById('color-title').innerText = color

  Tapcart.actions.openProduct({
    productId: `${productId}`,
    variantId: `${variantId}`,
    // isRelatedProduct: false, // optional, works only on PDPs
  })
}

// block-vendor:tapcart
// block-type:color-swatch
