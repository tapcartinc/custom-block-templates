let attachInterval = null

const timer = setInterval(() => {
  if (window.Tapcart.isInitialized) {
    const widget = OrderP.createWidget({
      store_url: "orderprotection.myshopify.com" // replace with {your store name}.myshopify.com
    })

    attachInterval = setInterval(() => {
      widget.ui.attach()
    }, 1000)

    clearInterval(timer)
  }
}, 100)