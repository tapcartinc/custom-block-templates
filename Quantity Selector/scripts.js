var quantityVal = 1

// Tapcart Variables
var selectedVariantId = Tapcart.variables.product.selectedVariant.id

// Tapcart Register Event Handler
Tapcart.registerEventHandler('product/updated', (data) => {
  selectedVariantId = data.product.selectedVariant.id
})

document.querySelector('input').addEventListener('change', (e) => {
  console.log('in', e.target.value)
  quantityVal = e.target.value
})

function increaseCount(a, b) {
  var input = b.previousElementSibling
  var value = parseInt(input.value, 10)
  value = isNaN(value) ? 0 : value
  value++
  input.value = value
  quantityVal = input.value
}

function decreaseCount(a, b) {
  var input = b.nextElementSibling
  var value = parseInt(input.value, 10)
  if (value > 1) {
    value = isNaN(value) ? 0 : value
    value--
    input.value = value
    quantityVal = input.value
    console.log(typeof quantityVal)
  }
}

function addToCart() {
  //Tapcart App Action for adding the line items to the cart
  Tapcart.actions.addToCart({
    lineItems: [
      {
        quantity: Number(quantityVal),
        variantId: selectedVariantId,
      },
    ],
  })
  document.querySelector('.add-to-cart').innerText = 'Added!'
  document.querySelector('.add-to-cart').disabled = true

  setTimeout(() => {
    document.querySelector('.add-to-cart').innerText = 'Add to cart'
    document.querySelector('.add-to-cart').disabled = false
  }, 2000)
}
