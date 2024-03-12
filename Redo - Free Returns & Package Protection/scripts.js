window.STOREFRONT_ACCESS_TOKEN = 'Shopify storefront access token here'
window.STORE_URL = 'Shopify store URL here'
window.WIDGET_ID = 'Your Redo widget ID here'

// Create a new script element
const script = document.createElement('script')

// Set the attributes for the script tag
script.type = 'text/javascript'
script.async = true
script.src = `https://shopify-extension.getredo.com/main.js?widget_id=${window.WIDGET_ID}&shop=${window.STORE_URL}`

script.defer = true

// Append the script element to the head of the document
document.head.appendChild(script)
