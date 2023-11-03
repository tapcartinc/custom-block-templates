const uuid = '230afc76-0089-46ce-81df-8bef0573e0e4'
const storeID = '62029103263'
const maxSuggestions = '5'

var fastSDKScript = document.createElement('script')
fastSDKScript.src = 'https://assets.fastsimon.com/sdk/latest/fast_simon_sdk.js'
fastSDKScript.async = true
document.head.appendChild(fastSDKScript)

function getOptimizedImageURL(url, size, isInIframe) {
  if (!size || isInIframe || url.includes('missing.gif')) {
    return url
  }
  const newSize = size
  const srcSize = url.substring(url.lastIndexOf('_') + 1, url.lastIndexOf('.'))

  if (['small', 'medium', 'large'].includes(srcSize)) {
    return url.replace('_' + srcSize + '.', '_' + newSize + 'x.')
  }
  return url.substr(0, url.lastIndexOf('_') + 1) + srcSize + '_' + newSize + 'x' + url.substr(url.lastIndexOf('.'))
}

function fetchProducts() {
  window.FastSimonSDK.productRecommendation({
    productID: Tapcart.variables.product.id,
    specs: [
      {
        sources: ['similar_products', 'similar_products_by_attributes', 'similar_products_lookalike', 'related_top_products'],
        maxSuggestions: maxSuggestions,
        widgetID: 'my-widget',
      },
    ],
    callback: (response) => {
      const payload = response.payload

      if (payload.length > 0) {
        for (let i = 0; i < payload.length; i++) {
          const widgetPayload = payload[0].payload
          if (widgetPayload) {
            const recommendationItems = widgetPayload.map((item) => {
              const productDetail = item

              return {
                id: +productDetail.id,
                variantId: productDetail.vra[0][0],
                title: productDetail.l,
                price: '$' + productDetail.p,
                regularPrice: '$' + productDetail.p_c,
                imageUrl: productDetail.t,
                imageUrl2: productDetail.t2,
                href: productDetail.u,
              }
            })

            renderRecommendationWidget(recommendationItems)
          }
        }
      }
    },
  })
}

function renderRecommendationWidget(recommendationItems) {
  const widgetContainer = document.querySelector('.recommendations')
  const carouselContainer = widgetContainer.querySelector('.carousel-container')

  // Create a heading for the widget
  const widgetHeading = document.getElementById('fs-title')

  // Create a list to hold the recommendation items
  const recommendationList = document.createElement('div')
  recommendationList.className = 'recommendation-list'

  // Iterate through the recommendation items and create list items
  recommendationItems.forEach((item) => {
    const listItem = document.createElement('div')
    listItem.className = 'recommendation-item'

    // Create an image element for the product image
    const image = document.createElement('img')
    image.src = getOptimizedImageURL(item.imageUrl, 250, false)
    image.alt = item.title

    // Create a link to the product page
    const productLink = document.createElement('h3')
    productLink.className = 'recommendation-title'
    productLink.href = item.href
    productLink.textContent = item.title

    // Create a paragraph for the product price
    const priceParagraph = document.createElement('p')
    priceParagraph.className = 'recommendation-price'
    priceParagraph.textContent = item.price

    // Add a click event listener to the image
    listItem.addEventListener('click', () => {
      clickProduct(item.id.toString(), item.variantId)
    })

    // Append elements to the list item
    listItem.appendChild(image)
    listItem.appendChild(productLink)
    listItem.appendChild(priceParagraph)

    // Append the list item to the recommendation list
    recommendationList.appendChild(listItem)
  })

  // Append the heading and recommendation list to the container
  carouselContainer.appendChild(recommendationList)
  if (recommendationItems && recommendationItems.length > 0) {
    widgetContainer.style.display = 'unset'
  }
}

function clickProduct(id, variantId) {
  window.FastSimonSDK.event({
    eventName: window.FastSimonEventName.RecommendationProductClicked,
    data: {
      productID: id,
    },
  })
  if (variantId) {
    Tapcart.actions.openProduct({ productId: id.toString(), variantId: variantId.toString() })
  } else {
    Tapcart.actions.openProduct({
      productId: id,
    })
  }
}

function init() {
  setTimeout(() => {
    window.FastSimonSDK.initialization({
      storeID: storeID, // store-id,
      uuid: uuid, // uuid
      type: 'SPA', // multi page application ("MPA") or single page application("SPA") (for reporting)
      onReady: () => {
        fetchProducts()
      },
    })
  }, 200)
}

if (window.FastSimonSDK && window.FastSimonSDK.initialization) {
  init()
} else {
  setTimeout(init, 500)
}
