// You can find your store domain name in your Shopify admin under Online Store > Domains

const storeDomain = 'store-domain' // e.g. 'johns-apparel'
const giftCardButtonText = "Send as a gift"

// Caution editing the code below

let selectedVariantId = Tapcart.variables.product.selectedVariant.id;

Tapcart.registerEventHandler("product/updated", function(eventData) {
  selectedVariantId = eventData.product.selectedVariant.id
});

gwbutton = document.querySelector('.gwbutton')
if (gwbutton) {
    gwbutton.innerHTML = giftCardButtonText
}


const addToCart = async ({ gift }) => {
  await Tapcart.actions.addToCart({
    lineItems: [
      {
        variantId: selectedVariantId,
        quantity: 1,
        attributes: [
          {
            key: '_gift_id',
            value: gift._gift_id,
          },
          {
            key: 'Name',
            value: gift.name,
          },
          {
            key: 'Email',
            value: gift.email,
          },
          {
            key: 'Message',
            value: gift.message,
          },
        ],
      },
    ],
  })
}

if (!window.Rise) {
  window.Rise = {
    settings: {},
  }
}

window.Rise = {
  ...window.Rise,
  full_product: { available: true },
  is_floating_cart_theme: false,
  is_product_page: true,
  product: { id: Tapcart.variables.product.id },
  using_add_to_cart_flow: false,
  onGiftAdded: addToCart,
}

const container = document.querySelector('.container')
const riseScript = document.createElement('script')

riseScript.src = `https://str.rise-ai.com/?shop=${storeDomain}.myshopify.com`
riseScript.onload = () => {
  window.Rise.settings.headless_without_shopify_cart_flow = true

  const popup = document.querySelector('.Rise-popup')

  if (!popup) {
    return
  }

  const iframe = popup.querySelector('iframe')
  const config = { attributes: true }

  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.attributeName === 'class') {
        if (popup.classList.contains('open')) {
          popup.style.maxHeight = ''
          container.style.height = '1300px'
        } else {
          container.style.height = ''
        }
      }
    }
  }

  const observer = new MutationObserver(callback)

  observer.observe(popup, config)
}

document.head.appendChild(riseScript)
