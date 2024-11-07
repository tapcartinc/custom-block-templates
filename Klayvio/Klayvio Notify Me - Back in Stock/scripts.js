let klayvioKey = "YOUR KLAYVIO KEY HERE"

let selectedVariantId = Tapcart.variables.product.selectedVariant.id
let variants = Tapcart.variables.product.variants
let foundSelectedVariant = variants.filter((variant) => variant.id === selectedVariantId)

// Tapcart Register Event Handler
Tapcart.registerEventHandler('product/updated', (data) => {
  selectedVariantId = data.product.selectedVariant.id
  variants = data.product.variants

  foundSelectedVariant = variants.filter((variant) => variant.id === selectedVariantId)

  if (!foundSelectedVariant[0].isAvailable) {
    notifyBtn.style.display = 'block'
    addToCartBtn.style.display = 'none'
  } else {
    notifyBtn.style.display = 'none'
    addToCartBtn.style.display = 'block'
  }
})

let addToCartBtn = document.querySelector('.add-to-cart')
let form = document.querySelector('.form_container')
let input = document.getElementById('email-input')
let notifyBtn = document.querySelector('.notify')

if (!foundSelectedVariant[0].isAvailable) {
  notifyBtn.style.display = 'block'
  addToCartBtn.style.display = 'none'
} else {
  notifyBtn.style.display = 'none'
  addToCartBtn.style.display = 'block'
}

function addToCart() {
  //Tapcart App Action for adding the line items to the cart
  Tapcart.actions.addToCart({
    lineItems: [
      {
        quantity: 1,
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

function emailCapture() {
  form.classList.toggle('inactive')
}

function klayvioSubmit(event) {
  event.preventDefault()
  let emailInput = document.querySelector('#email-input')
  let email = emailInput.value

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      revision: '2023-08-15',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        type: 'back-in-stock-subscription',
        attributes: {
          channels: ['PUSH'],
          profile: {
            data: {
              type: 'profile',
              attributes: {
                email: email,
              },
            },
          },
        },
        relationships: {
          variant: {
            data: {
              type: 'catalog-variant',
              id: `$shopify:::$default:::${selectedVariantId}`,
            },
          },
        },
      },
    }),
  }

  fetch(`https://a.klaviyo.com/client/back-in-stock-subscriptions/?company_id=${klayvioKey}`, options)
    .then((response) => {
      console.log('The RESPONSE', response)
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.status}`)
      }

      return response.text()
    })
    .then((text) => {
      console.log('The Text!', text)
      input.value = ''
      input.placeholder = 'Email sent!!'
      if (text.length === 0) {
        console.log('Empty response')
      } else {
        const data = JSON.parse(text)
        // console.log(data)
      }
    })
    .catch((error) => console.error(error))
}

// block-vendor:tapcart
// block-type:klaviyo-back-in-stock