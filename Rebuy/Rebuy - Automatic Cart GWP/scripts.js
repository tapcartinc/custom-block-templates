// Adjust values below per merchant
// Replace with Merchant API Key
const apiKey = 'YOUR_API_KEY'

// Add the Gift with pruchase data source ID here
const dataSourceID = 'YOUR_DATA_SOURCE_ID'

// Do not edit below this line


const endpoint = `/api/v1/custom/id/${dataSourceID}`

const config = {
  key: null,
  domain: 'https://rebuyengine.com',
  cdnDomain: 'https://cdn.rebuyengine.com',
  eventDomain: 'https://rebuyengine.com',
}

// Api class
class Api {
  constructor(options) {
    if (typeof options == 'string') {
      config.key = options
    } else if (typeof options == 'object' && options != null) {
      Object.assign(config, options)
    }
  }

  async callEvent(method, path, data) {
    return await this.makeCall(method, path, data, config.eventDomain)
  }

  async callCdn(method, path, data) {
    return await this.makeCall(method, path, data, config.cdnDomain)
  }

  async callApi(method, path, data) {
    return await this.makeCall(method, path, data, config.domain)
  }

  async makeCall(method, path, data, origin) {
    const url = `${origin}${path}`
    const requestUrl = new URL(url)

    const requestData = {
      key: config.key,
    }

    if (typeof data == 'object' && data != null) {
      Object.assign(requestData, data)
    }

    const requestObject = {
      method,
    }

    if (method == 'GET') {
      requestUrl.search = this.serialize(requestData)
    } else if (method == 'POST') {
      requestObject.headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
      requestObject.body = new URLSearchParams(requestData)
    }

    try {
      const request = await fetch(requestUrl, requestObject)
      return await request.json()
    } catch (err) {
      Tapcart.actions.showToast({
        message: 'Failed to fetch products',
        type: 'error', // "success" || "error"
      })
    }
  }

  serialize(obj) {
    const serialized = []

    const add = (key, value) => {
      value = typeof value === 'function' ? value() : value
      value = value === null ? '' : value === undefined ? '' : value
      serialized[serialized.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value)
    }

    const buildParameters = (prefix, obj) => {
      let i, len, key

      if (prefix) {
        if (Array.isArray(obj)) {
          for (i = 0, len = obj.length; i < len; i++) {
            buildParameters(prefix + '[' + (typeof obj[i] === 'object' && obj[i] ? i : '') + ']', obj[i])
          }
        } else if (Object.prototype.toString.call(obj) === '[object Object]') {
          for (key in obj) {
            buildParameters(prefix + '[' + key + ']', obj[key])
          }
        } else {
          add(prefix, obj)
        }
      } else if (Array.isArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
          add(obj[i].name, obj[i].value)
        }
      } else {
        for (key in obj) {
          buildParameters(key, obj[key])
        }
      }

      return serialized
    }
    return buildParameters('', obj).join('&')
  }
}

class GiftWithPurchase {
  constructor() {
    this.api = new Api(apiKey)
    this.cart = Tapcart?.variables?.cart || {}
    this.enrichedCart = []
    this.variantMap = {}
    this.products = []
    this.onlyOnce = true
    this.init()
  }

  init() {
    this.addItem = this.debounce(this.addToCart, 200)
    this.removeItem = this.debounce(this.removeFromCart, 500)
    this.enrichCartData()
    this.watchCart()
    // Will show the cart object when running
    // this.showCartUpdate();
  }

  async enrichCartData() {
    const productIds = this.getCartProductsIds()
    const enrichedProducts = await this.getProductsStatic(productIds)

    if (enrichedProducts && enrichedProducts.length > 0) {
      this.enrichedCart = enrichedProducts

      const cartItems = Tapcart.variables.cart.items
      const variantMap = this.mapEnrichedProductVariantsWithCart(this.enrichedCart, cartItems)

      if (Object.keys(variantMap).length > 0) {
        this.variantMap = variantMap
      }
    }

    this.getProducts()
  }

  getCartProductsIds() {
    const items = Tapcart.variables.cart.items

    if (items.length > 0) {
      return [...new Set(items.map((item) => item.productId))]
    }

    return []
  }

  getRebuyGiftsInCart() {
    const giftItemsInCart = []
    if (Tapcart.variables.cart?.items?.length > 0) {
      for (const item of Tapcart.variables.cart.items) {
        if (item?.attributes) {
          let isGiftItem = false
          if (item.attributes.hasOwnProperty('_attribution') && item.attributes._attribution === 'Rebuy Tapcart Gift with Purchase') {
            isGiftItem = true
          }
          if (isGiftItem) {
            giftItemsInCart.push({
              productId: item.productId,
              variantId: Number(item.variantId),
              quantity: item.quantity,
            })
          }
        }
      }
    }

    return giftItemsInCart
  }

  mapEnrichedProductVariantsWithCart(enrichedProducts, cartProducts) {
    const variantMap = {}

    for (const product of cartProducts) {
      const enrichedProduct = enrichedProducts.find((prod) => prod.id === Number(product.productId)) || {}

      const enrichedVariant = enrichedProduct?.variants?.find((variant) => variant.id === Number(product.variantId)) || {}

      variantMap[product.variantId] = enrichedVariant
    }

    return variantMap
  }

  async getProducts() {
    const cartItems = Tapcart?.variables?.cart?.items || []
    const customerId = Tapcart?.variables?.customer?.id || null

    const config = {
      shopify_product_ids: [],
      shopify_variant_ids: [],
      cart_count: cartItems.length,
      cart_line_count: cartItems.length,
      cart_subtotal: `${Math.round(Tapcart.variables.cart.subtotal * 100)}`,
      filter_inputs: 'no',
    }

    if (customerId) {
      config.shopify_customer_id = customerId
    }

    // Add cart items to get input if they are available
    if (cartItems?.length > 0) {
      config.cart = {
        item_count: cartItems.length,
        subtotal: `${Math.round(Tapcart.variables.cart.subtotal * 100)}`,
        items: [],
      }

      // May need to remove this functionality depending on how the product is discounted
      const cartSubtotalWithoutGifts = this.getCartSubtotalWithoutGiftItems()
      if (cartSubtotalWithoutGifts !== Tapcart.variables.cart.subtotal * 100) {
        config.cart_subtotal = cartSubtotalWithoutGifts
        config.cart.subtotal = cartSubtotalWithoutGifts
      }

      let itemCount = 0

      // Loop cart items for GET input
      for (const item of cartItems) {
        const itemData = {
          product_id: item.productId,
          variant_id: item.variantId,
          quantity: item.quantity,
        }

        if (item.sellingPlanId) {
          itemData.subscription_id = item.sellingPlanId
        }

        // Push cart items data
        config.cart.items.push(itemData)

        // Add input product ID's and variant ID's
        config.shopify_product_ids.push(item.productId)
        config.shopify_variant_ids.push(item.variantId)

        // Increment item count
        itemCount += item.quantity
      }

      // Turn to comma seperated string
      config.shopify_product_ids = config.shopify_product_ids.join(',')
      config.shopify_variant_ids = config.shopify_variant_ids.join(',')

      config.cart_item_count = `${itemCount}`
    }

    try {
      const response = await this.api.callApi('GET', endpoint, config)

      if (response.data) {
        this.products = response.data
        this.giftWithPurchaseAutoAdjust()
      }
    } catch (err) {
      console.error('Error', err)
    }
  }

  giftWithPurchaseAutoAdjust() {
    // Collect all gift items currently in the cart
    const giftVariantIds = []
    const gitftsToRemoveFromCart = []
    const giftsToAddToCart = []
    const giftsToAdjustQuantity = []
    const giftItemsInCart = this.getRebuyGiftsInCart()

    // No need to adjust if we do not have any gifts in cart or gifts returned from the data source
    if (giftItemsInCart.length === 0 && this.products.length === 0) return

    // Get all variant ID's for items returned from data source
    this.products.forEach((product) => {
      const variantArray = product.variants.map((variant) => variant.id)
      giftVariantIds.push(...variantArray)
    })

    // Remove variants to add that are already in the cart
    if (giftItemsInCart.length > 0) {
      giftItemsInCart.forEach(({ variantId, quantity }) => {
        if (!giftVariantIds.includes(variantId)) {
          gitftsToRemoveFromCart.push({ variantId, quantity })
        }
      })
    }

    // Find variants to add to cart
    if (giftVariantIds.length > 0) {
      giftVariantIds.forEach((id) => {
        const foundGift = giftItemsInCart.find(({ variantId }) => variantId === id)

        // If gift is not in the cart
        // Then add it to the cart
        if (!foundGift) {
          giftsToAddToCart.push(id)
        } else if (foundGift.quantity > 1) {
          const giftWithQuantity = {
            ...foundGift,
            quantity: foundGift.quantity - (foundGift.quantity - 1),
          }

          console.log('Reduce gift quantity', giftWithQuantity)
          giftsToAdjustQuantity.push(giftWithQuantity)
        }
      })
    }

    // Variants to add to cart
    if (giftsToAddToCart.length > 0) {
      this.addItem(giftsToAddToCart)
    }

    // Variants to remove from the cart
    if (gitftsToRemoveFromCart.length > 0) {
      this.removeItem(gitftsToRemoveFromCart)
    }

    if (giftsToAdjustQuantity.length > 0) {
      console.log('Reduce quantity')
      this.removeItem(giftsToAdjustQuantity)
    }
  }

  // May need to remove this functionality depending on how the discounting takes place
  getCartSubtotalWithoutGiftItems() {
    const subtotal = Math.round(Tapcart.variables.cart.subtotal * 100)
    const tapcartCartItems = Tapcart.variables.cart.items
    let calculatedSubtotal = 0

    // Add up subtotal from Rebuy products static
    for (const item of tapcartCartItems) {
      if (this.variantMap[item.variantId]) {
        const variantData = this.variantMap[item.variantId]
        const variantPrice = Math.round(Number(variantData.price) * 100)
        calculatedSubtotal += variantPrice * item.quantity
      }
    }

    // Make sure we come to the same subtotal before calculating the discount
    if (calculatedSubtotal === subtotal) {
      const giftsInCart = this.getRebuyGiftsInCart()
      for (const gift of giftsInCart) {
        if (this.variantMap[gift.variantId]) {
          const variantData = this.variantMap[gift.variantId]
          const variantPrice = Math.round(Number(variantData.price) * 100)
          calculatedSubtotal -= variantPrice
        }
      }

      return calculatedSubtotal
    }
    console.error('Was not able to calculate cart subtotal', 'Caluclated = ', calculatedSubtotal, ': Tapcart Subtotal = ', subtotal)

    // Fallback incase something went wrong
    return subtotal
  }

  async getProductsStatic(productIds) {
    if (!productIds || productIds.length === 0) return
    const endpoint = '/api/v1/products/static'
    const data = { ids: productIds.join(',') }

    try {
      const response = await this.api.callApi('GET', endpoint, data)
      console.log('Response', response)
      if (response?.data) {
        return response.data
      }
    } catch (err) {
      console.error('There was an issue getting products static', err)
    }
  }

  watchCart() {
    const gwp = this
    Tapcart.registerEventHandler('cart/updated', function (event) {
      gwp.cart = event.cart
      gwp.enrichCartData()
    })
  }

  // Takes an array of variant id's
  // Adds the variants to Tapcart
  addToCart(variants = []) {
    const data = { lineItems: [] }
    for (const variantId of variants) {
      data.lineItems.push({
        variantId,
        quantity: 1,
        attributes: [
          {
            key: '_source',
            value: 'Rebuy',
          },
          {
            key: '_attribution',
            value: 'Rebuy Tapcart Gift with Purchase', // Rebuy Tapcart Gift with Purchase
          },
        ],
      })
    }

    console.log('%cAdd Item to cart debounced', 'color: lime; background: black; padding: 10px;')

    Tapcart.actions.showToast({
      message: 'Added gift, discount applied at checkout',
      type: 'success',
    })

    Tapcart.actions.addToCart(data)
  }

  removeFromCart(variants = []) {
    const data = { lineItems: [] }
    for (const variant of variants) {
      data.lineItems.push({
        variantId: `${variant.variantId}`,
        quantity: variant.quantity,
        attributes: [
          {
            key: '_source',
            value: 'Rebuy',
          },
          {
            key: '_attribution',
            value: 'Rebuy Tapcart Gift with Purchase',
          },
        ],
      })
    }

    console.log('%cRemove items from cart debounce', 'color: red; background: black; padding: 10px;', data)
    Tapcart.actions.removeFromCart(data)
  }

  debounce(fn, wait, immediate) {
    let timeout

    return function () {
      let context = this
      let args = arguments

      let later = function () {
        timeout = null

        if (!immediate) {
          fn.apply(context, args)
        }
      }

      const callNow = immediate && !timeout

      clearTimeout(timeout)
      timeout = setTimeout(later, wait)

      if (callNow) {
        fn.apply(context, args)
      }
    }
  }

  // From Tapcart
  // Should show the contents of the cart on update
  showCartUpdate(update) {
    Handlebars.registerHelper('json', function (context) {
      return JSON.stringify(context, null, 2)
    })

    const source = `
        <div>the Variables Test Block</div>
        <pre style="white-space:pre-wrap;word-break:break-all;">{{json this}}</pre>
        `

    let extraDiv = document.querySelector('#extra')
    let extraTemplate = Handlebars.compile(source)
    if (update) {
      extraDiv.innerHTML = extraTemplate(update)
    } else {
      extraDiv.innerHTML = extraTemplate(Tapcart.variables)
    }

    Tapcart.registerEventHandler('cart/updated', function (eventData) {
      console.log('Update cart triggered')
      Handlebars.compile(source)
      extraDiv.innerHTML = extraTemplate({
        ...Tapcart.actions,
        ...eventData,
      })
    })
  }
}

document.giftWithPurchase = new GiftWithPurchase()

// block-vendor:rebuy
// block-type:gift-with-purchase
